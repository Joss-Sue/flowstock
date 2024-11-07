import z from 'zod'

const pedidoProductoSchema = z.object({
    pedido_id: z.string({
    invalid_type_error: 'Pedido must be an id',
    required_error: 'Pedido is required.'
  }).min(24),
  producto_id: z.string({
     invalid_type_error: 'Producto must be an id',
    required_error: 'Producto is required.'
  }).min(24),
  cantidad: z.number({
    invalid_type_error: 'Cantidad must be a number',
    required_error: 'Cantidad is required.'
  }).min(1)
 
})

export function validate (input) {
  return pedidoProductoSchema.safeParse(input)
}

export function validatePartial (input) {
  return pedidoProductoSchema.partial().safeParse(input)
}
