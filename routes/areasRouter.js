import { Router } from "express";
import areasController from "../controllers/areasController.js";

const router = Router();

router.get("/", areasController.areaList);

export default router;
