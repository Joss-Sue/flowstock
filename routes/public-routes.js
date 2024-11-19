import { Router } from 'express'

import { UsuariosController } from '../controllers/usuarios-controller.js'

export const publicRouter = Router()

publicRouter.post('logout', (req, res) => {
  res.clearCookie('acceso_token').json({ message: 'Sesion Cerrada Exitosa' })
})
publicRouter.post('/login', UsuariosController.matchUsuario)
publicRouter.post('/', UsuariosController.create)
