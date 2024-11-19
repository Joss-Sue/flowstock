import { Router } from 'express'

import { UsuariosController } from '../controllers/usuarios-controller.js'

export const publicRouter = Router()

publicRouter.post('/login', UsuariosController.matchUsuario)
publicRouter.post('/', UsuariosController.create)
