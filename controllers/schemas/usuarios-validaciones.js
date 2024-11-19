import z from 'zod'

const usuarioSchema = z.object({
  nombre: z.string({
    invalid_type_error: 'Nombre must be a string',
    required_error: 'Nombre is required.'
  }).min(1),
  email: z.string({
    invalid_type_error: 'Email must be a string',
    required_error: 'Email is required.'
  }).min(1),
  password: z.string({
    invalid_type_error: 'Contraseña must be a string',
    required_error: 'Contraseña is required.'
  }).min(1),
  tipo: z.string({
    invalid_type_error: 'Tipo must be a string',
    required_error: 'Tipo is required.'
  }).min(1)

})

export function validate (input) {
  return usuarioSchema.safeParse(input)
}

export function validatePartial (input) {
  return usuarioSchema.partial().safeParse(input)
}
