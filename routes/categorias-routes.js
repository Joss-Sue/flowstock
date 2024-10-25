import { Router } from 'express'

import { CategoriaController } from '../controllers/categoria_controller.js'

export const categoriaRouter = Router()

categoriaRouter.get('/', CategoriaController.getAll)
categoriaRouter.post('/', CategoriaController.create)

categoriaRouter.get('/:id', CategoriaController.getById)
categoriaRouter.delete('/:id', CategoriaController.delete)
categoriaRouter.patch('/:id', CategoriaController.update)
