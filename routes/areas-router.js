import { Router } from "express";
import areasContr from "../controllers/areasController.js";

const router = Router();

router.get("/", areasContr.getAllCategories);

export default router;
