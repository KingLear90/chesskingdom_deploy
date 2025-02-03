import express from 'express'
import bodyParser from 'body-parser'
import { PORT } from './config.js'
import { connectDB } from './database.js'
import userRoute from './routes/userRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
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
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});