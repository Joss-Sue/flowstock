/*import { PedidosModel } from '../models/mongoose/pedidos-model.js'
import { validate, validatePartial } from './schemas/pedidos-validaciones.js'

export class PedidosController {
  static async getAll (req, res) {
    const empresas = await PedidosModel.getAll()
    res.json(empresas)
  }

  static async getById (req, res) {
    const { id } = req.params
    const empresa = await PedidosModel.getById({ id })
    if (empresa) return res.json(empresa)
    res.status(404).json({ message: 'object not found' })
  }

  static async create (req, res) {
    const result = validate(req.body)

    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newObject = await PedidosModel.create({ input: result.data })

    res.status(201).json(newObject)
  }

  static async delete (req, res) {
    const { id } = req.params

    const result = await PedidosModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Object not found' })
    }

    return res.json({ message: 'Object deleted' })
  }

  static async update (req, res) {
    const result = validatePartial(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedMovie = await PedidosModel.update({ id, input: result.data })

    return res.json(updatedMovie)
  }
}
*/
// pedidos-controller.js
import { PedidosModel } from '../models/mongoose/pedidos-model.js';
//import { PedidosProductosModel } from '../models/mongoose/pedidosproductos-model.js';
import { PedidosProductos } from '../models/mongoose/Schemas/schemas-mongo.js'; 
import { Productos } from '../models/mongoose/Schemas/schemas-mongo.js';
import { EntradasSalidas } from '../models/mongoose/Schemas/schemas-mongo.js';

export class PedidosController {

  static async getAll (req, res) {
    const pedidos = await PedidosModel.getAll()
    res.json(pedidos)

  }

  static async create(req, res) {
    const { fecha_llegada_envio, estado, tipo_pedido, socio_empresa_id, productos } = req.body;

    try {
        // Validar que los campos requeridos estén presentes
        if (!fecha_llegada_envio || !estado || !tipo_pedido || !socio_empresa_id || !productos || productos.length === 0) {
            return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
        }

        // Crear el pedido usando el modelo
        const nuevoPedido = await PedidosModel.create({
            input: {
                fecha_llegada_envio,
                estado,
                tipo_pedido,
                socio_empresa_id,
            }
        });

        // Crear las relaciones entre el pedido y los productos
        const productosPedidos = [];

        for (const producto of productos) {
            const productoEncontrado = await Productos.findById(producto.producto_id); // Asegúrate de que el modelo de productos esté importado

            if (!productoEncontrado) {
                return res.status(404).json({ mensaje: `Producto con ID ${producto.producto_id} no encontrado` });
            }

            // Verificar si el tipo de pedido es "envío"
            if (tipo_pedido === 'envio') {
                // Verificar si hay suficiente stock
                if (productoEncontrado.stock < producto.cantidad) {
                    return res.status(400).json({ mensaje: `No hay suficiente stock para el producto ${producto.producto_id}` });
                }

                // Restar la cantidad del stock
                productoEncontrado.stock -= producto.cantidad;
                await productoEncontrado.save(); // Guardar los cambios en el producto
            }

            // Agregar la relación a la lista
            productosPedidos.push({
                pedido_id: nuevoPedido._id,
                producto_id: producto.producto_id,
                cantidad: producto.cantidad,
            });
        }

        // Guardar las relaciones en la colección PedidosProductos
        await PedidosProductos.insertMany(productosPedidos);

        // Responder con el pedido creado
        res.status(201).json({
            mensaje: 'Pedido creado exitosamente',
            pedido: {
                ...nuevoPedido._doc, // Incluye todos los campos del pedido guardado
                productos, // Incluye los productos asociados
            },
        });
    } catch (error) {
        console.error("Error al crear el pedido:", error);
        res.status(500).json({ mensaje: 'Error al crear el pedido', error: error.message });
    }
}

  static async getById(req, res) {
    const { id } = req.params;
    const pedido = await PedidosModel.getById({ id });
    if (pedido) return res.json(pedido);
    res.status(404).json({ message: 'Pedido no encontrado' });
  }

  static async getByDateRange(req, res) {
    const { startDate, endDate } = req.query;
    const pedidos = await PedidosModel.getByDateRange(new Date(startDate), new Date(endDate));
    res.json(pedidos);
  }

  static async update(req, res) {
    const { id } = req.params;
    const updates = req.body; // Obtener todos los campos que se envían en el cuerpo de la solicitud

    try {
        // Obtener el pedido actual
        const pedido = await PedidosModel.getById({ id });
        if (!pedido) {
            return res.status(404).json({ success: false, message: 'Pedido no encontrado' });
        }

        // Guardar el estado anterior
        const estadoAnterior = pedido.estado;

        // Actualizar el pedido con los nuevos datos
        const updatedPedido = await PedidosModel.update({ id, input: updates });

        if (!updatedPedido) {
            return res.status(400).json({ success: false, message: 'No se pudo actualizar el pedido' });
        }

        // Verificar si el estado ha cambiado
        if (estadoAnterior !== updatedPedido.estado) {
            const productosPedido = await PedidosProductos.find({ pedido_id: id });

            // Asegurarse de que el usuario_id esté presente en los updates
            if (!updates.usuario_id) {
                return res.status(400).json({ success: false, message: 'usuario_id es requerido' });
            }

            const usuario_id = updates.usuario_id; // Usar el ID del usuario proporcionado

            if (updatedPedido.estado === 'completado') {
                // Registrar entrada
                for (const productoPedido of productosPedido) {
                    await EntradasSalidas.create({
                        producto_id: productoPedido.producto_id,
                        cantidad: productoPedido.cantidad,
                        pedido_id: id,
                        usuario_id: usuario_id, // Usar el ID del usuario
                        estado: 1 // Estado activo
                    });

                    // Incrementar el stock
                    await Productos.findByIdAndUpdate(productoPedido.producto_id, {
                        $inc: { stock: productoPedido.cantidad },
                    });
                }
            } else if (updatedPedido.estado === 'enviado') {
                // Registrar salida
                for (const productoPedido of productosPedido) {
                    await EntradasSalidas.create({
                        producto_id: productoPedido.producto_id,
                        cantidad: productoPedido.cantidad,
                        pedido_id: id,
                        usuario_id: usuario_id, // Usar el ID del usuario
                        estado: 0 // Estado inactivo
                    });
                }
            }
        }

        return res.json({ success: true, message: 'Pedido actualizado con éxito', data: updatedPedido });
    } catch (error) {
        console.error('Error al actualizar pedido:', error);
        return res.status(500).json({ success: false, message: 'Error al actualizar pedido', error: error.message });
    }
}

  // Cancelar un pedid


    static async cancelarPedido(req, res) {
        const { pedidoId } = req.params;

        try {
            // Obtener el pedido por ID
            const pedido = await PedidosModel.getById({ id: pedidoId });
            if (!pedido) {
                return res.status(404).json({ success: false, message: 'Pedido no encontrado' });
            }

            // Verificar el estado del pedido
            if (pedido.estado === 'cancelado') {
                return res.status(400).json({ success: false, message: 'El pedido ya está cancelado' });
            }

            if (pedido.estado === 'completado'||pedido.estado === 'enviado') {
                return res.status(400).json({ success: false, message: 'No se puede cancelar un pedido completado' });
            }

            // Actualizar el estado del pedido
            pedido.estado = 'cancelado';
            await pedido.save();

            // Obtener productos del pedido
            const productosPedido = await PedidosProductos.find({ pedido_id: pedidoId });
            for (const productoPedido of productosPedido) {
                // Actualizar el estado del producto en PedidosProductos
                productoPedido.estado = 0; // O eliminar la relación si es necesario
                await productoPedido.save();

                // Si el tipo de pedido es "envío", incrementar el stock
                if (pedido.tipo_pedido === 'envio') {
                    await Productos.findByIdAndUpdate(productoPedido.producto_id, {
                        $inc: { stock: productoPedido.cantidad },
                    });
                }
            }

            res.json({ success: true, message: 'Pedido cancelado con éxito', data: pedido });
        } catch (error) {
            console.error('Error al cancelar pedido:', error);
            res.status(500).json({ success: false, message: 'Error al cancelar pedido', error: error.message });
        }
    }


    static async getFiltered(req, res) {
        const { estado, fechaInicio, fechaFin, proveedorId, productoId } = req.query;
        
        // Crear un filtro inicial
        const filter = {};
        
        // Agregar filtro por estado si se proporciona
        if (estado) {
          filter.estado = estado; // Aquí se espera que el estado sea una cadena como 'pendiente', 'completado', etc.
        }
        
        // Agregar filtro por fecha si se proporcionan
        if (fechaInicio || fechaFin) {
          filter.fecha_creacion = {};
          if (fechaInicio) {
            filter.fecha_creacion.$gte = new Date(fechaInicio);
          }
          if (fechaFin) {
            filter.fecha_creacion.$lte = new Date(fechaFin);
          }
        }
    
        // Obtener los pedidos que coincidan con el filtro
        try {
          const pedidos = await PedidosModel.getFiltered(filter);
    
          // Si se proporciona un proveedorId, filtrar los pedidos por proveedor
          if (proveedorId) {
            const pedidosFiltradosPorProveedor = await PedidosProductos.find({ proveedor_id: proveedorId });
            const pedidoIds = pedidosFiltradosPorProveedor.map(pp => pp.pedido_id);
            return res.json(pedidos.filter(p => pedidoIds.includes(p._id.toString())));
          }
    
          // Si se proporciona un productoId, filtrar los pedidos por producto
          if (productoId) {
            const pedidosFiltradosPorProducto = await PedidosProductos.find({ producto_id: productoId });
            const pedidoIds = pedidosFiltradosPorProducto.map(pp => pp.pedido_id);
            return res.json(pedidos.filter(p => pedidoIds.includes(p._id.toString())));
          }
    
          // Incluir detalles de pedidos productos
          const pedidosConDetalles = await Promise.all(pedidos.map(async (pedido) => {
            const detalles = await PedidosProductos.find({ pedido_id: pedido._id });
            return { ...pedido.toObject(), detalles };
          }));
    
          return res.json(pedidosConDetalles);
        } catch (error) {
          console.error('Error al obtener pedidos filtrados:', error);
          res.status(500).json({ message: 'Error interno del servidor' });
        }
      }

}



