
import { PedidosProductos } from './Schemas/schemas-mongo.js'
import { Productos } from './Schemas/schemas-mongo.js'
import { Pedidos } from './Schemas/schemas-mongo.js'
import mongoose from 'mongoose';
import connectDB from './config/db.js'

await connectDB()

export class PedidosProductosModel {
  static async getAll () {
    return await PedidosProductos.find({ estado: 1 })
  }

  static async getById({ pedidoId, productoId }) {
    try {
      // Verifica si los IDs son válidos
      if (!mongoose.Types.ObjectId.isValid(pedidoId) || !mongoose.Types.ObjectId.isValid(productoId)) {
        return null; // O lanza un error si prefieres
      }
  
      // Busca el documento en la base de datos usando ambos IDs
      const pedidoProducto = await PedidosProductos.findOne({
        pedido_id: pedidoId,
        _id: productoId,
        estado: 1
      });
  
      return pedidoProducto || null; // Devuelve null si no se encuentra
    } catch (error) {
      console.error('Error al buscar PedidoProducto:', error);
      throw error; // Re-lanza el error para que sea manejado más arriba
    }
  }

  static async create({ input }) {
    const { pedido_id, producto_id, cantidad } = input;

    // Verificar que el pedido esté en estado "pendiente"
    const pedido = await Pedidos.findById(pedido_id);
    if (!pedido || pedido.estado !== 'pendiente') {
        return { success: false, message: 'El pedido no está en estado pendiente.' };
    }

    // Verificar que el producto exista
    const producto = await Productos.findById(producto_id);
    if (!producto) {
        return { success: false, message: 'Producto no encontrado.' };
    }

    // Si el pedido es de tipo "envío", verificar el stock
    if (pedido.tipo_pedido === 'envio') {
        if (producto.stock < cantidad) {
            return { success: false, message: 'No hay suficiente stock del producto.' };
        }
        // Restar la cantidad del stock del producto
        producto.stock -= cantidad;
        await producto.save(); // Asegúrate de guardar el producto actualizado
    }

    // Crear el PedidoProducto
    const pedidoProducto = new PedidosProductos({
        pedido_id, // Asegúrate de que el modelo tenga estos campos
        producto_id,
        cantidad
    });
    await pedidoProducto.save();

    return { success: true, pedidoProducto };
}

static async delete({ id }) {
  console.log(`Buscando PedidoProducto con ID: ${id}`);
  
  const pedidoProducto = await PedidosProductos.findOne({ _id: id });
  
  if (!pedidoProducto) {
    console.log('PedidoProducto no encontrado.');
    return { success: false, message: 'PedidoProducto no encontrado.' };
  }

  console.log('PedidoProducto encontrado:', pedidoProducto);

  const pedido = await Pedidos.findById(pedidoProducto.pedido_id);
  if (!pedido) {
    console.log('Pedido no encontrado.');
    return { success: false, message: 'Pedido no encontrado.' };
  }

  console.log('Pedido encontrado:', pedido);

  if (pedido.estado !== 'pendiente') {
    console.log('No se puede eliminar el PedidoProducto porque el pedido no está en estado pendiente.');
    return { success: false, message: 'No se puede eliminar el PedidoProducto porque el pedido no está en estado pendiente.' };
  }

  const producto = await Productos.findById(pedidoProducto.producto_id);
  if (pedido.tipo_pedido === 'envio') { // Cambiar 'tipo' a 'tipo_pedido'
    producto.stock += pedidoProducto.cantidad; // Regresar la cantidad al stock
    await producto.save();
  }

  // Cambiar el estado a 0
  pedidoProducto.estado = 0;
  await pedidoProducto.save();
  console.log('PedidoProducto eliminado correctamente.');
  return { success: true, pedidoProducto };
}

static async update({ id, input }) {
  const pedidoProducto = await PedidosProductos.findById(id);
  if (!pedidoProducto) {
      return { success: false, message: 'PedidoProducto no encontrado.' };
  }

  // Verificar que el pedido esté en estado "pendiente"
  const pedido = await Pedidos.findById(pedidoProducto.pedido_id);
  if (!pedido || pedido.estado !== 'pendiente') {
      return { success: false, message: 'No se puede editar el PedidoProducto porque el pedido no está en estado pendiente.' };
  }

  // Si se cambia la cantidad y el tipo es "envío", ajustar el stock
  const producto = await Productos.findById(pedidoProducto.producto_id);
  if (pedido.tipo_pedido === 'envio') {
    const cantidadAnterior = pedidoProducto.cantidad;
    const cantidadNueva = input.cantidad;

    // Ajustar el stock según la cantidad anterior
    if (cantidadNueva > cantidadAnterior) {
        // Aumento de cantidad
        const cantidadADescontar = cantidadNueva - cantidadAnterior; // Calcular la cantidad a descontar
        if (producto.stock < cantidadADescontar) {
            return { success: false, message: 'No hay suficiente stock del producto.' };
        }
        producto.stock -= cantidadADescontar; // Restar la nueva cantidad del stock
    } else if (cantidadNueva < cantidadAnterior) {
        // Disminución de cantidad
        const cantidadAAgregar = cantidadAnterior - cantidadNueva; // Calcular la cantidad a agregar
        producto.stock += cantidadAAgregar; // Agregar al stock
    }

    // Actualizar el PedidoProducto con la nueva cantidad
    pedidoProducto.cantidad = cantidadNueva; // Actualizar la cantidad del pedido
    await pedidoProducto.save(); // Guardar los cambios en el pedido
    await producto.save(); // Guardar los cambios en el stock
}

  // Actualizar el PedidoProducto
  Object.assign(pedidoProducto, input);
  await pedidoProducto.save();
  return { success: true, pedidoProducto };
}
}


