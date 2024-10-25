import { Categoria } from './Schemas/schema.js'
import connectDB from './config/db.js'

await connectDB()

export class CategoriaModel {
  static async getAll () {
    return await Categoria.find({ estado: 1 })
  }

  static async getById ({ id }) {
    return await Categoria.findById(id)
  }

  static async create ({ input }) {
    const movie = new Categoria(input)
    await movie.save()
    return movie
  }

  static async delete ({ id }) {
    const result = await Categoria.findByIdAndUpdate(id, { $set: { estado: 0 } })
    return result || false
  }

  static async update ({ id, input }) {
    const movie = await Categoria.findByIdAndUpdate(id, { $set: input }, { new: true })
    return movie || false
  }
}
