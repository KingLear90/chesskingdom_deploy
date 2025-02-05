import { SECRET } from "../config.js";
import { verifyToken } from "../utils/verifyToken.js";

export const verifyTokenMiddleware = (req, res, next) => {
        console.log('Full Authorization header:', req.headers.authorization);
        console.log('All headers:', req.headers);
        // Verifica si el token está en el header de autorización de la petición.
    try {    
        const token = req.headers.authorization?.split(" ")[1] || req.session.token;

        if (!token) {
            return res.status(401).json({ message: "Token not found. Authorization denied." });
        }

        const decoded = verifyToken(token, SECRET); // Decodifica el token.
        console.log('Successfully decoded token:', decoded);
        req.user = decoded;
        next();     // Si sale bien, sigue el flujo de la app.
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized token", error: error.message });
    }
}