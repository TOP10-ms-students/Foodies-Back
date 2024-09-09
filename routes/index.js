import { Router } from "express";
import authRouter from "./authRouter.js";
import usersRouter from "./usersRouter.js";
import categoriesRouter from "./categoriesRouter.js";
import areasRouter from "./areasRouter.js";
import ingredientsRouter from "./ingredientsRouter.js";
import testimonialsRouter from "./testimonialsRouter.js";
import recipesRouter from "./recipesRouter.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/categories", categoriesRouter);
router.use("/areas", areasRouter);
router.use("/ingredients", ingredientsRouter);
router.use("/testimonials", testimonialsRouter);
router.use("/recipes", recipesRouter);

export default router;
