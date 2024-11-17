import { Productos } from './Schemas/schemas-mongo.js'
import connectDB from './config/db.js'

await connectDB()

export class ProductosModel {
  static async getAll () {
    return await Productos.find({ estado: 'activo' })
  }

  static async getById ({ id }) {
    return await Productos.findById(id)
  }

  /*static async create ({ input }) {
    const producto = new Productos(input)
    await producto.save()
    return producto
  }*/

  /*static async delete ({ id }) {
    const result = await Productos.findByIdAndUpdate(id, { $set: { estado: 0 } })
    return result || false
  }*/
    static async delete({ id }) {
      // Cambiar el estado a 'inactivo' en lugar de eliminar el documento
      const result = await Productos.findByIdAndUpdate(
        id,
        { $set: { estado: 'inactivo' } },
        { new: true } // Devuelve el documento actualizado
      );
      return result || false; // Devuelve el producto actualizado o false si no se encontró
    }

  static async update ({ id, input }) {
    const producto = await Productos.findByIdAndUpdate(id, { $set: input }, { new: true })
    return producto || false
  }

 // Crear un nuevo producto
 static async create({ input }) {
  // Verificar si el nombre ya existe
  const existingProducto = await Productos.findOne({ nombre: input.nombre });
  if (existingProducto) {
    throw new Error('El nombre del producto ya existe.');
  }

  const producto = new Productos(input);
  await producto.save();
  return producto;
} 

   // Buscar productos por nombre
   static async getByName({ nombre }) {
    return await Productos.find({ nombre: new RegExp(nombre, 'i'), estado: 'activo' });
  }

  // Nuevo método para buscar productos por categoría
  static async getByCategoria({ categoriaId }) {
    return await Productos.find({ categoria_id: categoriaId, estado: 'activo' });
  }
}
