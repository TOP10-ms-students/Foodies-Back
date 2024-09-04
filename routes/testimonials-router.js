import { Router } from "express";
import { getAllTestimonials } from "../controllers/testimonialsController.js";

const testimonialsRouter = Router();
testimonialsRouter.get("/", getAllTestimonials);

export default testimonialsRouter;


