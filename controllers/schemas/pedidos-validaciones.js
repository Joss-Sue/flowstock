import z from 'zod'

const pedidoSchema = z.object({
  fecha_llegada_envio: z.date({
    invalid_type_error: 'Llegada must be a date',
    required_error: 'Llegada is required.'
  }).refine(date => date > new Date(), {
    message: 'Fecha de llegada debe ser una fecha futura.'
  }),
  estado: z.string({
    invalid_type_error: 'Estado must be a string',
    required_error: 'Estado is required.'
  }).min(1),
  tipo_pedido: z.string({
    invalid_type_error: 'Tipo must be a string',
    required_error: 'Tipo is required.'
  }).min(1),
  socio_empresa_id: z.string({
    invalid_type_error: 'Socio must be a id',
    required_error: 'Socio is required.'
  }).min(24)
 
})

export function validate (input) {
  return pedidoSchema.safeParse(input)
}

export function validatePartial (input) {
  return pedidoSchema.partial().safeParse(input)
}
