import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UsuariosModel } from '../models/mongoose/usuarios-model.js'
import { validate, validatePartial } from './schemas/usuarios-validaciones.js'
import { contraProtec } from '../models/mongoose/config/env.js'

export class UsuariosController {
  static async getAll (req, res) {
    const empresas = await UsuariosModel.getAll()
    res.json(empresas)
  }

  static async getById (req, res) {
    const { id } = req.params
    const empresa = await UsuariosModel.getById({ id })
    if (empresa) return res.json(empresa)
    res.status(404).json({ message: 'object not found' })
  }

  static async create (req, res) {
    try {
      const result = validate(req.body)
      if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }

      const contraEncriptada = await bcrypt.hash(req.body.password, 2)
      const dataResult = { ...req.body, password: contraEncriptada }

      // Intentar crear el usuario
      const newObject = await UsuariosModel.create({ input: dataResult })

      res.status(201).json(newObject)
    } catch (error) {
      // Manejo de errores de duplicados
      if (error.code === 11000) { // Código de error de duplicados en MongoDB
        return res.status(409).json({ error: 'El correo ya está en uso' })
      }

      console.error('Error al crear el usuario:', error)
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  static async delete (req, res) {
    const { id } = req.params

    const result = await UsuariosModel.delete({ id })

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

    let dataResult = req.body

    if (req.body.password) {
      const contraEncriptada = await bcrypt.hash(req.body.password, 2)
      dataResult = { ...req.body, password: contraEncriptada }
    }

    const { id } = req.params
    const updatedUsuario = await UsuariosModel.update({ id, input: dataResult })
    return res.json(updatedUsuario)
  }

  static async matchUsuario (req, res) {
    // console.log(req.body)
    // console.log(req.body.password)

    const usuario = await UsuariosModel.getOne(req.body.email)
    if (!usuario) {
      return res.status(403).json({ message: 'User not found' })
    }

    const passwordMatch = await bcrypt.compare(req.body.password, usuario.password)
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' })
    }
    //const token = jwt.sign({ id: usuario._id, nombre: usuario.nombre }, contraProtec, { expiresIn: '1h' })
    return res
      //.cookie('acceso_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 })
      //.json({ id: usuario._id, token }) //
      .json({ id: usuario._id })
  }
}
