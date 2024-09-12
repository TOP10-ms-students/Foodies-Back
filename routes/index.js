import { Router } from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import categoryRouter from "./categoryRouter.js";
import areaRouter from "./areaRouter.js";
import ingredientRouter from "./ingredientRouter.js";
import testimonialRouter from "./testimonialRouter.js";
import recipeRouter from "./recipeRouter.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/areas", areaRouter);
router.use("/ingredients", ingredientRouter);
router.use("/testimonials", testimonialRouter);
router.use("/recipes", recipeRouter);

export default router;
