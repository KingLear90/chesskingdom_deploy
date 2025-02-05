import express from 'express'
import bodyParser from 'body-parser'
import { PORT } from '../src/config.js'
import { connectDB } from '../src/database.js'
import userRoute from '../src/routes/userRoute.js'
import categoryRoute from '../src/routes/categoryRoute.js'
import productRoute from '../src/routes/productRoute.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import cors from 'cors'

const app = express()

// Parsea a JSON las solicitudes
app.use(bodyParser.json()) 

// Parsea cuerpo de la solicitud para que pueda ser leida - queryfiying
app.use(bodyParser.urlencoded({ extended: true })) 

// Habilitación de lectura de cookies
app.use(cookieParser())

// Configuración de la sesión
app.use(
    session({
        secret: 'secret',
        resave: false, // Evita que la sesión se vuelva a guardar si no hay datos
        saveUninitialized: false, // Evita que se guarde una sesión sin datos
    })
)

app.use(cors({
    origin: [
      'https://chesskingdom.vercel.app',
      'https://chesskingdomthebackend.vercel.app',
      'http://localhost:5173',
      'http://localhost:3001'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

//Conexión a la base de datos
connectDB();

// Rutas
// http://localhost:3001/api/user/get
// http://localhost:3001/api/product/get
// http://localhost:3001/api/category/get
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);

export default app;