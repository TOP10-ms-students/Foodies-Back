import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import favoriteRecipesControllers from "../controllers/favoriteRecipesControllers.js";

const recipesRouter = Router();

recipesRouter.delete(":id/favorite", authenticate, recipesControllers.deleteFavoriteRecipe);

export default recipesRouter;
