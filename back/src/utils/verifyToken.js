import jwt from "jsonwebtoken";

export function verifyToken(token, SECRET) {        // Toma el token y verifica si es válido.
    console.log('Token a verificar:', token);
    console.log('SECRET usado para verificar:', SECRET);
    try {
        const decoded = jwt.verify(token, SECRET);
        console.log('Token decodificado:', decoded);
        return decoded;
    } catch (error) {
        console.log('Error específico de verificación:', error.message);
        throw new Error("Invalid token");
    }
}