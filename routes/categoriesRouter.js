import { Router } from "express";
import categoriesContr from "../controllers/categoriesControllers.js";

const router = Router();

router.get("/", categoriesContr.getAllCategories);

export default router;
