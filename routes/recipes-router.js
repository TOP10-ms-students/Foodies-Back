import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import recipesControllers from "../controllers/recipesControllers.js";

const recipesRouter = Router();

recipesRouter.delete("/:id", authenticate, recipesControllers.deleteRecipe);

recipesRouter.get("/my-recipes", authenticate, recipesControllers.getUserRecipes);

recipesRouter.get("/", recipesControllers.getAllRecipes);

recipesRouter.get("/popular", recipesControllers.getPopularRecipes);

recipesRouter.get("/favorite", authenticate, recipesControllers.getFavoriteRecipes);

recipesRouter.get("/:id", recipesControllers.getOneRecipe);

export default recipesRouter;
