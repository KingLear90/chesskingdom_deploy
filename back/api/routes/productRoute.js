import { Router } from "express";
import { createProduct, getProduct, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js"
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js";

const productRoute = Router();

// CLIENTS

productRoute.post("/create", verifyTokenMiddleware, createProduct);
productRoute.get("/get", getProduct);
productRoute.post("/get-by-id/:id", getProductById);
productRoute.delete("/delete/:id", verifyTokenMiddleware, deleteProduct);
productRoute.put("/update/:id", verifyTokenMiddleware, updateProduct)

export default productRoute;


