import { CategoriaModel } from '../models/mongoose/categoria-model.js'
import { validate, validatePartial } from '../schemas/categorias.js'

export class CategoriaController {
  static async getAll (req, res) {
    const empresas = await CategoriaModel.getAll()
    res.json(empresas)
  }

  static async getById (req, res) {
    const { id } = req.params
    const empresa = await CategoriaModel.getById({ id })
    if (empresa) return res.json(empresa)
    res.status(404).json({ message: 'object not found' })
  }

  static async create (req, res) {
    const result = validate(req.body)

    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newObject = await CategoriaModel.create({ input: result.data })

    res.status(201).json(newObject)
  }

  static async delete (req, res) {
    const { id } = req.params

    const result = await CategoriaModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Object not found' })
    }

    return res.json({ message: 'Object deleted' })
  }

  static async update (req, res) {
    const result = validatePartial(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedMovie = await CategoriaModel.update({ id, input: result.data })

    return res.json(updatedMovie)
  }
}
