import { Router } from "express";
import areaController from "../controllers/areaController.js";

const router = Router();

router.get("/", areaController.areaList);

export default router;
