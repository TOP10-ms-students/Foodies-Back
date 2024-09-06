import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import recipesControllers from "../controllers/recipesControllers.js";

const recipesRouter = Router();

recipesRouter.get("/my-recipes", authenticate, recipesControllers.getUserRecipes);

recipesRouter.get("/popular", recipesControllers.getPopularRecipes);

recipesRouter.get("/favorite", authenticate, recipesControllers.getFavoriteRecipes);

recipesRouter.delete("/:id", authenticate, recipesControllers.deleteRecipe);

recipesRouter.get("/:id", recipesControllers.getOneRecipe);

recipesRouter.get("/", recipesControllers.getAllRecipes);

export default recipesRouter;
