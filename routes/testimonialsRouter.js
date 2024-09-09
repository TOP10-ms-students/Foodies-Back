import { Router } from "express";
import testimonialsController from "../controllers/testimonialsController.js";

const testimonialsRouter = Router();

testimonialsRouter.get("/", testimonialsController.getAllTestimonials);

export default testimonialsRouter;
