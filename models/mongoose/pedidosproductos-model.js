/*import { PedidosProductos } from './Schemas/schemas-mongo.js'
import connectDB from './config/db.js'

await connectDB()

export class PedidosProductosModel {
  static async getAll () {
    return await PedidosProductos.find({ estado: 1 })
  }

  static async getById ({ id }) {
    return await PedidosProductos.findById(id)
  }

  static async create ({ input }) {
    const movie = new PedidosProductos(input)
    await movie.save()
    return movie
  }

  static async delete ({ id }) {
    const result = await PedidosProductos.findByIdAndUpdate(id, { $set: { estado: 0 } })
    return result || false
  }

  static async update ({ id, input }) {
    const movie = await PedidosProductos.findByIdAndUpdate(id, { $set: input }, { new: true })
    return movie || false
  }
}
*/

// pedidosproductos-model.js
import { PedidosProductos } from './Schemas/schemas-mongo.js';
import connectDB from './config/db.js';

await connectDB();

export class PedidosProductosModel {
  static async create({ input }) {
    const pedidoProducto = new PedidosProductos(input);
    await pedidoProducto.save();
    return pedidoProducto;
  }

  static async delete({ id }) {
    return await PedidosProductos.findByIdAndUpdate(id, { estado: 0 });
  }

  static async getByPedidoId(pedidoId) {
    return await PedidosProductos.find({ pedido_id: pedidoId });
  }

  static async update({ id, input }) {
    const pedidoProducto = await PedidosProductos.findById(id);
    if (pedidoProducto) {
      // Lógica para actualizar según el tipo de pedido
      if (input.cantidad > pedidoProducto.cantidad) {
        // Si se agregan más y es envío, restar del stock
        if (pedidoProducto.tipo_pedido === 'envio') {
          // Lógica para restar del stock
        }
      } else {
        // Si se restan más y es envío, sumar al stock
        if (pedidoProducto.tipo_pedido === 'envio') {
          // Lógica para sumar al stock
        }
      }
      return await PedidosProductos.findByIdAndUpdate(id, { $set: input }, { new: true });
    }
    return false;
  }
}