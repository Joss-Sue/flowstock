import { Router } from 'express'

import { PedidosProductosController } from '../controllers/pedidosproductos-controller.js'

export const pedidosproductosRouter = Router()

pedidosproductosRouter.get('/', PedidosProductosController.getAll)
pedidosproductosRouter.post('/', PedidosProductosController.create)

pedidosproductosRouter.get('/:pedidoId/:productoId', PedidosProductosController.getById);
pedidosproductosRouter.delete('/:id', PedidosProductosController.delete)
pedidosproductosRouter.patch('/:id', PedidosProductosController.update)
