import { Router } from 'express'

import { PedidosController } from '../controllers/pedidos-controller.js'

export const pedidosRouter = Router()

pedidosRouter.get('/', PedidosController.getAll)
pedidosRouter.post('/', PedidosController.create)

pedidosRouter.get('/:id', PedidosController.getById)
pedidosRouter.delete('/:id', PedidosController.delete)
pedidosRouter.patch('/:id', PedidosController.update)
