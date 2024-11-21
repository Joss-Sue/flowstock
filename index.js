import express, { json } from 'express' // require -> commonJS
import cookieParser from 'cookie-parser'

import { empresasRouter } from './routes/empresas-routes.js'
import { categoriasRouter } from './routes/categorias-routes.js'
import { proveedoresRouter } from './routes/proveedores-routes.js'
import { productosRouter } from './routes/productos-routes.js'
import { pedidosRouter } from './routes/pedidos-routes.js'
import { usuariosRouter } from './routes/usuarios-routes.js'
import { salidasRouter } from './routes/salidas-routes.js'
import { pedidosproductosRouter } from './routes/pedidosproductos-routes.js'
import verificarToken from './middleware/token.js'
import { publicRouter } from './routes/public-routes.js'

const app = express()
app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware())
app.use(cookieParser())

app.get('/', (req, res) => res.send('Api Hosteada Funcionando'))

app.use('/public', publicRouter)

app.use('/protected', verificarToken)

app.use('/protected/empresas', empresasRouter)
app.use('/protected/categorias', categoriasRouter)
app.use('/protected/proveedores', proveedoresRouter)
app.use('/protected/productos', productosRouter)
app.use('/protected/pedidos', pedidosRouter)
app.use('/protected/usuarios', usuariosRouter)
app.use('/protected/salidas', salidasRouter)
app.use('/protected/pedidosproductos', pedidosproductosRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
