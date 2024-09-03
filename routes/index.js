import { Router } from "express";
import usersRouter from "./users-router.js";
import categoriesRouter from "./categories-router.js";
import areasRouter from "./areas-router.js";
import ingredientsRouter from "./ingredients-router.js";
import testimonialsRouter from "./testimonials-router.js";
import recipesRouter from "./recipes-router.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/categories", categoriesRouter);
router.use("/areas", areasRouter);
router.use("/ingredients", ingredientsRouter);
router.use("/testimonials", testimonialsRouter);
router.use("/recipes", recipesRouter);

export default router;
