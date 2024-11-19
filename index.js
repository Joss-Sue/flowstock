import express, { json } from 'express' // require -> commonJS
import { empresasRouter } from './routes/empresas-routes.js'
import { categoriasRouter } from './routes/categorias-routes.js'

import { proveedoresRouter } from './routes/proveedores-routes.js'
import { productosRouter } from './routes/productos-routes.js'
import { pedidosRouter } from './routes/pedidos-routes.js'
import { usuariosRouter } from './routes/usuarios-routes.js'
import { salidasRouter } from './routes/salidas-routes.js'
import { pedidosproductosRouter } from './routes/pedidosproductos-routes.js'

// import { corsMiddleware } from './middleware/cors.js'

const app = express()
app.use(json())
// app.use(corsMiddleware())
app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express

app.use('/empresas', empresasRouter)
app.use('/categorias', categoriasRouter)

app.use('/proveedores', proveedoresRouter)
app.use('/productos', productosRouter)
app.use('/pedidos', pedidosRouter)
app.use('/usuarios', usuariosRouter)
app.use('/salidas', salidasRouter)
app.use('/pedidosproductos', pedidosproductosRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
