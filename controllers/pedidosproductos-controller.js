import { PedidosProductosModel } from '../models/mongoose/pedidosproductos-model.js'
import { validate, validatePartial } from './schemas/pedidosproductos-validaciones.js'
import mongoose from 'mongoose';

export class PedidosProductosController {
  static async getAll (req, res) {
    const empresas = await PedidosProductosModel.getAll()
    res.json(empresas)
  }

  // Obtener un producto de pedido por ID
  static async getById(req, res) {
    const { pedidoId, productoId } = req.params;
  
    // Validar los IDs
    if (!mongoose.Types.ObjectId.isValid(pedidoId) || !mongoose.Types.ObjectId.isValid(productoId)) {
      return res.status(400).json({ message: 'ID(s) no válido(s)' });
    }
  
    try {
      const pedidoProducto = await PedidosProductosModel.getById({ pedidoId, productoId });
  
      if (!pedidoProducto) {
        return res.status(404).json({ message: 'PedidoProducto no encontrado' });
      }
  
      return res.status(200).json(pedidoProducto);
    } catch (error) {
      console.error('Error al buscar PedidoProducto:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  static async create(req, res) {
    const result = validate(req.body);

    if (!result.success) {
        // 422 Unprocessable Entity
        return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    try {
        // Llama al método de creación del modelo
        const newObject = await PedidosProductosModel.create({ input: result.data });

        // Retorna el objeto creado
        return res.status(201).json(newObject);
    } catch (error) {
        console.error('Error al crear PedidoProducto:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

static async delete(req, res) {
  const { id } = req.params;

  // Validar el ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID no válido' });
  }

  try {
    const result = await PedidosProductosModel.delete({ id });

    if (result.success === false) {
      return res.status(404).json({ message: result.message });
    }

    return res.json({ message: 'PedidoProducto eliminado correctamente', pedidoProducto: result.pedidoProducto });
  } catch (error) {
    console.error('Error al eliminar PedidoProducto:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

static async update(req, res) {
  const { id } = req.params;

  // Validar el ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID no válido' });
  }

  const result = validatePartial(req.body);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  try {
    const updatedPedidoProducto = await PedidosProductosModel.update({ id, input: result.data });

if (!updatedPedidoProducto) {
      return res.status(404).json({ message: 'PedidoProducto no encontrado para actualizar.' });
    }

    return res.json(updatedPedidoProducto);
  } catch (error) {
    console.error('Error al actualizar PedidoProducto:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}
}
