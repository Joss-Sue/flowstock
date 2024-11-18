import { Router } from 'express';
import { EntradasSalidasController } from '../controllers/salidas-controller.js';

export const salidasRouter = Router();

salidasRouter.get('/', EntradasSalidasController.getAll);
salidasRouter.post('/', EntradasSalidasController.create);
salidasRouter.get('/:id', EntradasSalidasController.getById);
salidasRouter.delete('/:id', EntradasSalidasController.delete);
salidasRouter.patch('/:id', EntradasSalidasController.update);

// Nuevo endpoint para obtener entradas o salidas
salidasRouter.get('/filtro/tipo', EntradasSalidasController.getByType); // Usar ?tipo=entradas o ?tipo=salidas