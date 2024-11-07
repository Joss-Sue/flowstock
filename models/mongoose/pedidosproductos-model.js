import { PedidosProductos } from './Schemas/schemas-mongo.js'
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
