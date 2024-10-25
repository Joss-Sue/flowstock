import z from 'zod'

const categoriaSchema = z.object({
  nombre: z.string({
    invalid_type_error: 'Nombre must be a string',
    required_error: 'Nombre is required.'
  }).min(1),
  descripcion: z.string({
    invalid_type_error: 'Email must be a string',
    required_error: 'Email is required.'
  }).min(1)
})

export function validate (input) {
  return categoriaSchema.safeParse(input)
}

export function validatePartial (input) {
  return categoriaSchema.partial().safeParse(input)
}
