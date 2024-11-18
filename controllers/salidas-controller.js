import { EntradasSalidasModel } from '../models/mongoose/salidas-model.js';
import { validate, validatePartial } from './schemas/salidas-validaciones.js';

export class EntradasSalidasController {
  static async getAll(req, res) {
    const empresas = await EntradasSalidasModel.getAll();
    res.json(empresas);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const entradaSalida = await EntradasSalidasModel.getById({ id });
    if (entradaSalida) return res.json(entradaSalida);
    res.status(404).json({ message: 'object not found' });
  }

  static async create(req, res) {
    const result = validate(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const newObject = await EntradasSalidasModel.create({ input: result.data });
    res.status(201).json(newObject);
  }

  static async delete(req, res) {
    const { id } = req.params;
    const result = await EntradasSalidasModel.delete({ id });
    if (result === false) {
      return res.status(404).json({ message: 'Object not found' });
    }
    return res.json({ message: 'Object deleted' });
  }

  static async update(req, res) {
    const result = validatePartial(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const { id } = req.params;
    const updatedObject = await EntradasSalidasModel.update({ id, input: result.data });
    return res.json(updatedObject);
  }

  // Método para obtener entradas o salidas con filtros
  static async getByType(req, res) {
    const { tipo, fechaInicio, fechaFin } = req.query;
  
    // Determinar el estado basado en el tipo
    let estado;
    if (tipo === 'entradas') {
      estado = 1; // Entradas
    } else if (tipo === 'salidas') {
      estado = 0; // Salidas
    } else {
      return res.status(400).json({ message: 'Tipo debe ser "entradas" o "salidas"' });
    }
  
    // Construir el filtro
    const filter = { estado };
  
    // Agregar filtros de fecha si se proporcionan
    if (fechaInicio || fechaFin) {
      filter.fecha = {};
      if (fechaInicio) {
        filter.fecha.$gte = new Date(fechaInicio);
      }
      if (fechaFin) {
        filter.fecha.$lte = new Date(fechaFin);
      }
    }
  
    try {
      const resultados = await EntradasSalidasModel.getAll(filter);
      res.json(resultados);
    } catch (error) {
      console.error('Error al obtener entradas o salidas:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}