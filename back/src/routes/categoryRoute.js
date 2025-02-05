import { Router } from "express";
import { createCategory, getCategory, getCategoryById, deleteCategory, updateCategory } from "../controllers/categoryController.js";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js";

const categoryRoute = Router();

// CATEGORIES

categoryRoute.post("/create", verifyTokenMiddleware, createCategory);
categoryRoute.get("/get", getCategory);
categoryRoute.post("/get-by-id/:id", getCategoryById);
categoryRoute.delete("/delete/:id", verifyTokenMiddleware, deleteCategory);
categoryRoute.put("/update/:id", verifyTokenMiddleware, updateCategory);

export default categoryRoute;