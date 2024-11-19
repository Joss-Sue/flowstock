import jwt from 'jsonwebtoken'
import { contraProtec } from '../models/mongoose/config/env.js'

const verificarToken = (req, res, next) => {
  const token = req.cookies.acceso_token

  if (!token) {
    return res.status(401).json({ message: 'No tienes acceso a esta ruta' })
  }

  try {
    const decoded = jwt.verify(token, contraProtec)

    // Si el token es válido, se guarda la información del usuario en req.user
    req.user = decoded

    // Continuar con la siguiente función de middleware
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Acceso no autorizado', error: error.message })
  }
}

export default verificarToken
