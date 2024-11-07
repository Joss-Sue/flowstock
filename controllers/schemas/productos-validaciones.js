import z from 'zod'

const productoSchema = z.object({
  nombre: z.string({
    invalid_type_error: 'Nombre must be a string',
    required_error: 'Nombre is required.'
  }).min(1),
  descripcion: z.string({
    invalid_type_error: 'Descripcion must be a string',
    required_error: 'Descripcion is required.'
  }).min(1),
  stock: z.number({
    invalid_type_error: 'Stock must be a number',
    required_error: 'Stock is required.'
  }).min(0),
  categoria_id: z.string({
    invalid_type_error: 'Categoria must be an id',
    required_error: 'Categoria is required.'
  }).min(24)
 
})

export function validate (input) {
  return productoSchema.safeParse(input)
}

export function validatePartial (input) {
  return productoSchema.partial().safeParse(input)
}
