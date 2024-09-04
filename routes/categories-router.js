import { Router } from "express";
import db from "../db/models/index.cjs";
import ctrlWrapper from "../middleware/ctrlWrapper.js";

const router = Router();

async function getAllCategories(_, res) {
    const allCategories = await db.Categories.findAll();
    res.json(allCategories);
};

router.get("/", ctrlWrapper(getAllCategories));

export default router;

