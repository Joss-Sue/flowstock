import { Categorias } from './Schemas/schemas-mongo.js'
import connectDB from './config/db.js'

await connectDB()

export class CategoriasModel {
  static async getAll () {
    return await Categorias.find({ estado: 1 })
  }

  static async getById ({ id }) {
    return await Categorias.findById(id)
  }

  static async create ({ input }) {
    const movie = new Categorias(input)
    await movie.save()
    return movie
  }

  static async delete ({ id }) {
    const result = await Categorias.findByIdAndUpdate(id, { $set: { estado: 0 } })
    return result || false
  }

  static async update ({ id, input }) {
    const movie = await Categorias.findByIdAndUpdate(id, { $set: input }, { new: true })
    return movie || false
  }
}
