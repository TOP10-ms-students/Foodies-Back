import { Router } from "express";
import ingredientController from "../controllers/ingredientController.js";

const route = Router();

route.get("/", ingredientController.getIngredientList);

export default route;
