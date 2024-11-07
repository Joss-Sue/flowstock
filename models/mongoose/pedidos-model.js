import { Pedidos } from './Schemas/schemas-mongo.js'
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
}
