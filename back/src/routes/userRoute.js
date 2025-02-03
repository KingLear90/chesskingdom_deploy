import { Router } from "express";
import {
    createUser,
    deleteUser,
    getUser,
    getUserById,
    updateUser,
    validateUser,
  } from "../controllers/userController.js";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js";

//Crearenrutador
const userRoute = Router();

//Endpoints
// USERS
//Ruta de creación con post
userRoute.post("/create", createUser);
// Middleware de verificación de token para que no cualquiera pueda acceder a todos los usuarios, borrarlos o actualizarlos. 
userRoute.get("/get", verifyTokenMiddleware, getUser); 
userRoute.delete("/delete/:id", verifyTokenMiddleware, deleteUser);  // El id se pasa por parámetro
userRoute.put("/update/:id", verifyTokenMiddleware, updateUser);  // Idem al anterior

userRoute.post("/get-by-id/:id", getUserById);
userRoute.post("/login", validateUser);


export default userRoute;