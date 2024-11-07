import mongoose from 'mongoose'

// Definir el esquema de la película
const empresaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true }
  // Agrega otros campos que necesites en tu modelo
})
// Crear el modelo de película
export const Empresas = mongoose.model('Empresas', empresaSchema)

const categoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  fecha_creacion: { type: Date, default: Date.now },
  estado: { type: Number, enum: [0, 1], default: 1 }
})
// Crear el modelo de categoría
export const Categorias = mongoose.model('Categorias', categoriaSchema)

 // Definir el esquema del proveedor
const proveedorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  contacto: { type: String },
  telefono: { type: String },
  email: { type: String },
  direccion: { type: String },
  fecha_creacion: { type: Date, default: Date.now },
  estado: { type: Number, enum: [0, 1], default: 1 }
});

// Crear el modelo de proveedor
export const Proveedores = mongoose.model('Proveedores', proveedorSchema);

// Definir el esquema del producto
const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  stock: { type: Number, default: 0 },
  categoria_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' },
  estado: { type: String, enum: ['activo', 'inactivo', 'descontinuado', 'reemplazado'], required: true },
  fecha_creacion: { type: Date, default: Date.now }
});

// Crear el modelo de producto
export const Productos = mongoose.model('Productos', productoSchema);

// Definir el esquema del pedido
const pedidoSchema = new mongoose.Schema({
  fecha_creacion: { type: Date, default: Date.now },
  fecha_llegada_envio: { type: Date },
  estado: { type: String, enum: ['pendiente', 'completado', 'cancelado', 'enviado'], required: true },
  tipo_pedido: { type: String, enum: ['envio', 'llegada'], required: true },
  socio_empresa_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor' }
});

// Crear el modelo de pedido
export const Pedidos = mongoose.model('Pedidos', pedidoSchema);

// Definir el esquema del usuario
const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  tipo: { type: String, enum: ['administrador', 'empleado'], required: true },
  fecha_creacion: { type: Date, default: Date.now },
  estado: { type: Number, default: 1 }
});

// Crear el modelo de usuario
export const Usuarios = mongoose.model('Usuarios', usuarioSchema);

// Definir el esquema de entradas/salidas
const entradaSalidaSchema = new mongoose.Schema({
  producto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
  cantidad: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
  pedido_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' },
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  estado: { type: Number, default: 1 }
});

// Crear el modelo de entradas/salidas
export const EntradasSalidas = mongoose.model('EntradasSalidas', entradaSalidaSchema);

// Definir el esquema de relación entre pedidos y productos
const pedidoProductoSchema = new mongoose.Schema({
  pedido_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' },
  producto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
  cantidad: { type: Number, required: true }
}, { _id: false });

// Crear el modelo de relación entre pedidos y productos
export const PedidosProductos = mongoose.model('PedidosProductos', pedidoProductoSchema); 
