import { Empresa } from './Schemas/schema.js'
import connectDB from './config/db.js'

await connectDB()

export class EmpresaModel {
  static async create ({ input }) {
    const movie = new Empresa(input)
    await movie.save()
    return movie
  }
}

/* export class MovieModel {
  static async getAll ({ genre }) {
    const query = genre
      ? { genre: { $elemMatch: { $regex: genre, $options: 'i' } } }
      : {}
    return await Movie.find(query)
  }

  static async getById ({ id }) {
    return await Movie.findById(id)
  }

  static async create ({ input }) {
    const movie = new Movie(input)
    await movie.save()
    return movie
  }

  static async delete ({ id }) {
    const result = await Movie.deleteOne({ _id: id })
    return result.deletedCount > 0
  }

  static async update ({ id, input }) {
    const movie = await Movie.findByIdAndUpdate(id, { $set: input }, { new: true })
    return movie || false
  }
} */
