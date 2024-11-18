/*import { Pedidos } from './Schemas/schemas-mongo.js'
import connectDB from './config/db.js'

await connectDB()

export class PedidosModel {
  static async getAll () {
    return await Pedidos.find({ estado: 1 })
  }

  static async getById ({ id }) {
    return await Pedidos.findById(id)
  }

  static async create ({ input }) {
    const movie = new Pedidos(input)
    await movie.save()
    return movie
  }

  static async delete ({ id }) {
    const result = await Pedidos.findByIdAndUpdate(id, { $set: { estado: 0 } })
    return result || false
  }

  static async update ({ id, input }) {
    const movie = await Pedidos.findByIdAndUpdate(id, { $set: input }, { new: true })
    return movie || false
  }
}*/
// pedidos-model.js
import { Pedidos } from './Schemas/schemas-mongo.js';
import connectDB from './config/db.js';

await connectDB();

export class PedidosModel {


  static async getAll () {
    return await Pedidos.find({ estado: 1 })
  }

  static async getFiltered(filter) {
    return await Pedidos.find(filter);
  }

  static async create({ input }) {
    const pedido = new Pedidos(input);
    return await pedido.save(); // Devuelve el pedido guardado
}

static async getById({ id }) {
  // No usar populate aquí, ya que 'pedidosProductos' no está en el esquema de Pedidos
  return await Pedidos.findById(id);
}

  static async getByDateRange(startDate, endDate) {
    return await Pedidos.find({
      fecha_creacion: { $gte: startDate, $lte: endDate },
    });
  }

  static async update({ id, input }) {
    const pedido = await Pedidos.findByIdAndUpdate(id, { $set: input }, { new: true });
    return pedido || false;
}

  static async delete({ id }) {
    return await Pedidos.findByIdAndUpdate(id, { estado: 'cancelado' });
  }
}
