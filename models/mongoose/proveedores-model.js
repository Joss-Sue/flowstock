import { Proveedores } from './Schemas/schemas-mongo.js'
import connectDB from './config/db.js'

await connectDB()

export class ProveedoresModel {
  static async getAll () {
    return await Proveedores.find({ estado: 1 })
  }

  static async getById ({ id }) {
    return await Proveedores.findById(id)
  }

  static async create ({ input }) {
    const movie = new Proveedores(input)
    await movie.save()
    return movie
  }

  static async delete ({ id }) {
    const result = await Proveedores.findByIdAndUpdate(id, { $set: { estado: 0 } })
    return result || false
  }

  static async update ({ id, input }) {
    const movie = await Proveedores.findByIdAndUpdate(id, { $set: input }, { new: true })
    return movie || false
  }
}
