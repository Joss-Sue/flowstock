// import { MovieModel } from '../models/local-file-system/movie.js'
import { EmpresaModel } from '../models/mongoose/empresa-model.js'
// import { MovieModel } from '../models/movie-model.js'
import { validateEmpresa } from './schemas/empresas.js'

export class EmpresaController {
  static async getAll (req, res) {
    const empresas = await EmpresaModel.getAll()
    res.json(empresas)
  }

  static async getById (req, res) {
    const { id } = req.params
    const empresa = await EmpresaModel.getById({ id })
    if (empresa) return res.json(empresa)
    res.status(404).json({ message: 'empresa not found' })
  }

  static async create (req, res) {
    const result = validateEmpresa(req.body)

    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newEmpresa = await EmpresaModel.create({ input: result.data })

    res.status(201).json(newEmpresa)
  }
}
