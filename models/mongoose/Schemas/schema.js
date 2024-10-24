import mongoose from 'mongoose'

// Definir el esquema de la película
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: [String], required: true }
  // Agrega otros campos que necesites en tu modelo
})

// Crear el modelo de película
export const Movie = mongoose.model('Movie', movieSchema)

// Definir el esquema de la película
const empresaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true }
  // Agrega otros campos que necesites en tu modelo
})

// Crear el modelo de película
export const Empresa = mongoose.model('Empresas', empresaSchema)
