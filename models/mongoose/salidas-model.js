import { EntradasSalidas } from './Schemas/schemas-mongo.js'
import connectDB from './config/db.js'

await connectDB()

export class EntradasSalidasModel {
  static async getAll () {
    return await EntradasSalidas.find({ estado: 1 })
  }

  static async getById ({ id }) {
    return await EntradasSalidas.findById(id)
  }

  static async create ({ input }) {
    const movie = new EntradasSalidas(input)
    await movie.save()
    return movie
  }

  static async delete ({ id }) {
    const result = await EntradasSalidas.findByIdAndUpdate(id, { $set: { estado: 0 } })
    return result || false
  }

  static async update ({ id, input }) {
    const movie = await EntradasSalidas.findByIdAndUpdate(id, { $set: input }, { new: true })
    return movie || false
  }
}
