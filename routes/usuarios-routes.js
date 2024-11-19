import { Router } from 'express'

import { UsuariosController } from '../controllers/usuarios-controller.js'

export const usuariosRouter = Router()

usuariosRouter.post('/login', UsuariosController.matchUsuario)

usuariosRouter.get('/:id', UsuariosController.getById)
usuariosRouter.delete('/:id', UsuariosController.delete)
usuariosRouter.patch('/:id', UsuariosController.update)

usuariosRouter.get('/', UsuariosController.getAll)
usuariosRouter.post('/', UsuariosController.create)
