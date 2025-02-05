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

app.use(express.json())

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

const allowedOrigins = [
    'https://chesskingdom.vercel.app',
    'http://localhost:5173',
    'http://localhost:3001'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.options('*', cors());

//Conexión a la base de datos
connectDB();

// Rutas
// http://localhost:3001/api/user/get
// http://localhost:3001/api/product/get
// http://localhost:3001/api/category/get
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});