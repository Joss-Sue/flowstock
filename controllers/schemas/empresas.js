import z from 'zod'

const movieSchema = z.object({
  nombre: z.string({
    invalid_type_error: 'Nombre must be a string',
    required_error: 'Nombre is required.'
  }),
  correo: z.string({
    invalid_type_error: 'Email must be a string',
    required_error: 'Email is required.'
  })
})

export function validateEmpresa (input) {
  return movieSchema.safeParse(input)
}

export function validatePartialEmpresa (input) {
  return movieSchema.partial().safeParse(input)
}
