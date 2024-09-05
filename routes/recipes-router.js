import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import recipesControllers from "../controllers/recipesControllers.js";
import recipesController from "../controllers/favoriteRecipesControllers.js";

const recipesRouter = Router();

recipesRouter.use(authenticate);

recipesRouter.get("/", recipesControllers.getAllRecipes);

recipesRouter.get("/:id", recipesControllers.getOneRecipe);

recipesRouter.get("/favorite", authenticate, recipesController.getFavoriteRecipes);

export default recipesRouter;
