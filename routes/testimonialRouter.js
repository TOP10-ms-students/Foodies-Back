import { Router } from "express";
import testimonialController from "../controllers/testimonialController.js";

const testimonialRouter = Router();

testimonialRouter.get("/", testimonialController.getTestimonialList);

export default testimonialRouter;
