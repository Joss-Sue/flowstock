import express, { json } from 'express' // require -> commonJS
import { empresasRouter } from './routes/empresas-routes.js'
import { categoriasRouter } from './routes/categorias-routes.js'
// import { corsMiddleware } from './middleware/cors.js'

const app = express()
app.use(json())
// app.use(corsMiddleware())
app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express

app.use('/empresas', empresasRouter)
app.use('/categorias', categoriasRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
