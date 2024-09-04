import { Router } from "express";
import authRouter from "./authRouter.js";
import usersRouter from "./users-router.js";
import categoriesRouter from "./categories-router.js";
import areasRouter from "./areas-router.js";
import ingredientsRouter from "./ingredients-router.js";
import testimonialsRouter from "./testimonials-router.js";
import recipesRouter from "./recipes-router.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/categories", categoriesRouter);
router.use("/areas", areasRouter);
router.use("/ingredients", ingredientsRouter);
router.use("/testimonials", testimonialsRouter);
router.use("/recipes", recipesRouter);

export default router;
