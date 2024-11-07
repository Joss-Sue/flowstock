import z from 'zod'

const entradaSalidaSchema = z.object({
    producto_id: z.string({
    invalid_type_error: 'Producto must be an id',
    required_error: 'Producto is required.'
  }).min(24),
  cantidad: z.number({
    invalid_type_error: 'Cantidad must be a number',
    required_error: 'Cantidad is required.'
  }).min(1),
  pedido_id: z.string({
    invalid_type_error: 'Pedido must be an id',
    required_error: 'ContPedidoraseña is required.'
  }).min(24),
  usuario_id: z.string({
    invalid_type_error: 'Usuario must be an id',
    required_error: 'Usuario is required.'
  }).min(24)
 
})

export function validate (input) {
  return entradaSalidaSchema.safeParse(input)
}

export function validatePartial (input) {
  return entradaSalidaSchema.partial().safeParse(input)
}
