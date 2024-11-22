import { Router } from 'express'

import { UsuariosController } from '../controllers/usuarios-controller.js'

export const publicRouter = Router()

publicRouter.post('logout', (req, res) => {
  res.clearCookie('acceso_token').json({ message: 'Sesion Cerrada Exitosa' })
})
publicRouter.post('/login', UsuariosController.matchUsuario)
publicRouter.post('/', UsuariosController.create)

publicRouter.get('/cookie', (req, res) => {
  const token = req.cookies.acceso_token; // Obtener la cookie
  if (token) {
    return res.json({ token }); // Enviar la cookie como JSON
  }
  return res.status(404).json({ message: 'Cookie no encontrada' });
});