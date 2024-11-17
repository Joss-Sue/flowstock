import { ProductosModel } from '../models/mongoose/productos-model.js'
import { validate, validatePartial } from './schemas/productos-validaciones.js'

export class ProductosController {


  static async getByName(req, res) {
    try {
      const { nombre } = req.params;
      const productos = await ProductosModel.getByName({ nombre }); // Llama al método correcto
      res.json(productos);
    } catch (error) {
      res.status(500).json({ message: 'Error al buscar productos.', error });
    }
  }

  static async create(req, res) {
    try {
      const { nombre, descripcion, stock, categoria_id } = req.body;

      const nuevoProducto = await ProductosModel.create({ input: { nombre, descripcion, stock, categoria_id } });
      res.status(201).json(nuevoProducto);
    } catch (error) {
      // Manejo de errores
      if (error.message === 'El nombre del producto ya existe.') {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: 'Error al crear el producto.', error });
    }
  }

  static async getAll (req, res) {
    const empresas = await ProductosModel.getAll()
    res.json(empresas)
  }

  static async getById (req, res) {
    const { id } = req.params
    const empresa = await ProductosModel.getById({ id })
    if (empresa) return res.json(empresa)
    res.status(404).json({ message: 'object not found' })
  }

  /*static async create (req, res) {
    const result = validate(req.body)

    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newObject = await ProductosModel.create({ input: result.data })

    res.status(201).json(newObject)
  }*/

  /*static async delete (req, res) {
    const { id } = req.params

    const result = await ProductosModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Object not found' })
    }

    return res.json({ message: 'Object deleted' })
  }*/

    static async delete(req, res) {
      const { id } = req.params;
    
      try {
        const result = await ProductosModel.delete({ id });
    
        if (!result) {
          return res.status(404).json({ message: 'Producto no encontrado.' });
        }
    
        res.json({ message: 'Producto marcado como inactivo.', producto: result });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el producto.', error });
      }
    }

  static async update (req, res) {
    const result = validatePartial(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedMovie = await ProductosModel.update({ id, input: result.data })

    return res.json(updatedMovie)
  }
  static async getByCategoria(req, res) {
    const { categoriaId } = req.params;

    try {
      const productos = await ProductosModel.getByCategoria({ categoriaId });

      if (productos.length === 0) {
        return res.status(404).json({ message: 'No se encontraron productos para esta categoría.' });
      }

      res.json(productos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al buscar productos.', error });
    }
  }
}
