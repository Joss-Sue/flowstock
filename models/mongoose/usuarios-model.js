import { Usuarios } from './Schemas/schemas-mongo.js'
import connectDB from './config/db.js'

await connectDB()

export class UsuariosModel {
  static async getAll () {
    return await Usuarios.find({ estado: 1 })
  }

  static async getById ({ id }) {
    return await Usuarios.findById(id)
  }

  static async create ({ input }) {
    const movie = new Usuarios(input)
    await movie.save()
    return movie
  }

  static async delete ({ id }) {
    const result = await Usuarios.findByIdAndUpdate(id, { $set: { estado: 0 } })
    return result || false
  }

  static async update ({ id, input }) {
    const movie = await Usuarios.findByIdAndUpdate(id, { $set: input }, { new: true })
    return movie || false
  }
}
