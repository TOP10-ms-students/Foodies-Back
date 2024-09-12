import { Router } from "express";
import categoriesControllers from "../controllers/categoriesControllers.js";

const router = Router();

router.get("/", categoriesControllers.categoryList);

export default router;
