import { Router } from 'express'

import { ProveedoresController } from '../controllers/proveedores-controller.js'

export const proveedoresRouter = Router()

proveedoresRouter.get('/', ProveedoresController.getAll)
proveedoresRouter.post('/', ProveedoresController.create)

proveedoresRouter.get('/:id', ProveedoresController.getById)
proveedoresRouter.delete('/:id', ProveedoresController.delete)
proveedoresRouter.patch('/:id', ProveedoresController.update)
