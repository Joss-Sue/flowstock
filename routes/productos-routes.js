import { Router } from 'express'

import { ProductosController } from '../controllers/productos-controller.js'

export const productosRouter = Router()

productosRouter.get('/', ProductosController.getAll)
productosRouter.post('/', ProductosController.create)

productosRouter.get('/:id', ProductosController.getById)
productosRouter.delete('/:id', ProductosController.delete)
productosRouter.patch('/:id', ProductosController.update)
