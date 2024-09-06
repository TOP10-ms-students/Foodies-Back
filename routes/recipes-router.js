import { Router } from "express";
import recipesControllers from "../controllers/recipesControllers.js";
import recipesController from "../controllers/favoriteRecipesControllers.js";
import authenticate from "../middleware/authenticate.js";

const recipesRouter = Router();

recipesRouter.use(authenticate);

recipesRouter.get("/", recipesControllers.getAllRecipes);

recipesRouter.get("/favorite", recipesController.getFavoriteRecipes);

recipesRouter.get("/:id", recipesControllers.getOneRecipe);

export default recipesRouter;
