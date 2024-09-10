import { Router } from "express";
import areasContr from "../controllers/areasController.js";

const router = Router();

router.get("/", areasContr.getAllAreas);

export default router;
