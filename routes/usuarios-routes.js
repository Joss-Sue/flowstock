import { Router } from 'express'

import { UsuariosController } from '../controllers/usuarios-controller.js'

export const usuariosRouter = Router()

usuariosRouter.get('/:id', UsuariosController.getById)
usuariosRouter.delete('/:id', UsuariosController.delete)
usuariosRouter.patch('/:id', UsuariosController.update)
usuariosRouter.get('/', UsuariosController.getAll)
