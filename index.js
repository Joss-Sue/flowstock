import express, { json } from 'express' // require -> commonJS
import cookieParser from 'cookie-parser'
import cors from 'cors'


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

const corsMiddleware = cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:1234',
      'http://localhost:3000',
      'https://movies.com',
      'https://midu.dev'
    ];

    // Permitir solicitudes sin origen (por ejemplo, herramientas como Postman)
    if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS no permitido para este origen'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Métodos permitidos
  credentials: true // Si necesitas permitir cookies o credenciales
});

// Aplica el middleware globalmente

const app = express()
app.disable('x-powered-by')
app.use(corsMiddleware);
app.use(express.json({ limit: '10mb' }))
//app.use(corsMiddleware())
//app.use(cookieParser()) //se comenta para que no envie la cookie

app.get('/', (req, res) => res.send('Api Hosteada Funcionando'))

app.use('/public', publicRouter)

//app.use('/protected', verificarToken)// se comenta para que no valide con token

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
