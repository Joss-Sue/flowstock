import z from 'zod'

const proveedorSchema = z.object({
  nombre: z.string({
    invalid_type_error: 'Nombre must be a string',
    required_error: 'Nombre is required.'
  }).min(1),
  contacto: z.string({
    invalid_type_error: 'Contacto must be a string',
    required_error: 'Contacto is required.'
  }).min(1),
  telefono: z.string({
    invalid_type_error: 'telefono must be a string',
    required_error: 'telefono is required.'
  }).min(1),
  email: z.string({
    invalid_type_error: 'Email must be a string',
    required_error: 'Email is required.'
  }).min(1),
  direccion: z.string({
    invalid_type_error: 'Direccion must be a string',
    required_error: 'Direccion is required.'
  }).min(1)
})

export function validate (input) {
  return proveedorSchema.safeParse(input)
}

export function validatePartial (input) {
  return proveedorSchema.partial().safeParse(input)
}
