import { Productos } from './Schemas/schemas-mongo.js'
import connectDB from './config/db.js'

await connectDB()

export class ProductosModel {
  static async getAll () {
    return await Productos.find({ estado: 1 })
  }

  static async getById ({ id }) {
    return await Productos.findById(id)
  }

  static async create ({ input }) {
    const movie = new Productos(input)
    await movie.save()
    return movie
  }

  static async delete ({ id }) {
    const result = await Productos.findByIdAndUpdate(id, { $set: { estado: 0 } })
    return result || false
  }

  static async update ({ id, input }) {
    const movie = await Productos.findByIdAndUpdate(id, { $set: input }, { new: true })
    return movie || false
  }
}
