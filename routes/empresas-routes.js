import { Router } from 'express'

import { EmpresaController } from '../controllers/empresa_controller.js'

export const empresasRouter = Router()

empresasRouter.get('/', EmpresaController.getAll)
empresasRouter.post('/', EmpresaController.create)

empresasRouter.get('/:id', EmpresaController.getById)
// moviesRouter.delete('/:id', MovieController.delete)
// moviesRouter.patch('/:id', MovieController.update)
