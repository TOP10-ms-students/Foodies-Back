import { Router } from "express";
import testimonialsController from "../controllers/testimonialsController.js";

const testimonialsRouter = Router();

testimonialsRouter.get("/", testimonialsController.testimonialList);

export default testimonialsRouter;
