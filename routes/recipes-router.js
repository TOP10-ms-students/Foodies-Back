import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import recipesControllers from "../controllers/recipesControllers.js";
import favoriteRecipesControllers from "../controllers/favoriteRecipesControllers.js";

const recipesRouter = Router();

recipesRouter.get("/", recipesControllers.getAllRecipes);

recipesRouter.get("/:id", recipesControllers.getOneRecipe);

recipesRouter.delete(":id/favorite", authenticate, favoriteRecipesControllers.deleteFavoriteRecipe);

export default recipesRouter;
