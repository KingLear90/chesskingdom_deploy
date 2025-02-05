// MODELO DE USUARIO
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import { isGoodPassword } from '../utils/validators.js';

export const profileEnum = ["admin", "employee", "user"];
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        set: value => value.charAt(0).toUpperCase() + value.slice(1),
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                // Validar que el email tenga un formato válido
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return emailRegex.test(value);
            },
            message: "Invalid email format",
        },
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return isGoodPassword(value);
            },
            message:  "Password must be 6-12 characters long, contain at least one uppercase letter, one lowercase letter, and one number.",
        }
    },
    profile: {
        type: String,
        validate: {
            validator: function (profile) {
                return profileEnum.includes(profile);
            },
            
            message: `Profile must be one of the following: ${profileEnum.join(", ")}`,
        },
        default: "user",
    },
})

// Middleware: password encriptada ANTES (.pre) de guardarla en la base de datos.
UserSchema.pre("save", function (next) {     // Se ejecuta antes de guardar el documento en la base de datos. 
    this.password = bcryptjs.hashSync(this.password, 10); // Se va a encriptar la contraseña 10 veces.
    next(); // Se ejecuta el siguiente middleware o el guardado en la BD.
})

export default mongoose.model('user', UserSchema);