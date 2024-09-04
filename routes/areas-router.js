import { Router } from "express";
import db from "../db/models/index.cjs";
import ctrlWrapper from "../middleware/ctrlWrapper.js";

const router = Router();

async function getAllAreas(req, res) {
    const allAreas = await db.Areas.findAll();
    res.json(allAreas);
};

router.get("/", ctrlWrapper(getAllAreas));

export default router;
