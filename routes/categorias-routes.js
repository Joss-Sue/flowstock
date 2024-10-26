import { Router } from 'express'

import { CategoriasController } from '../controllers/categorias-controller.js'

export const categoriasRouter = Router()

categoriasRouter.get('/', CategoriasController.getAll)
categoriasRouter.post('/', CategoriasController.create)

categoriasRouter.get('/:id', CategoriasController.getById)
categoriasRouter.delete('/:id', CategoriasController.delete)
categoriasRouter.patch('/:id', CategoriasController.update)
