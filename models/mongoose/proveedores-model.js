import { Proveedores } from './Schemas/schemas-mongo.js'
import { Pedidos } from './Schemas/schemas-mongo.js'; //
import connectDB from './config/db.js'

await connectDB()

export class ProveedoresModel {
  static async getAll () {
    return await Proveedores.find({ estado: 1 })
  }

  static async getById ({ id }) {
    return await Proveedores.findById(id)
  }

  static async create ({ input }) {
    const proveedor = new Proveedores(input)
    await proveedor.save()
    return proveedor
  }

  static async delete({ id }) {
    // Verificar si hay pedidos pendientes asociados al proveedor
    const pedidosPendientes = await Pedidos.find({ socio_empresa_id: id, estado: 'pendiente' });

    if (pedidosPendientes.length > 0) {
      return { success: false, message: 'No se puede eliminar el proveedor porque tiene pedidos pendientes.' };
    }

    // Si no hay pedidos pendientes, cambiar el estado del proveedor a 0
    const result = await Proveedores.findByIdAndUpdate(id, { $set: { estado: 0 } }, { new: true });
    return result || false;
  }

  static async update({ id, input }) {
    const proveedor = await Proveedores.findByIdAndUpdate(id, { $set: input }, { new: true });
    return proveedor || false;
  }

}
