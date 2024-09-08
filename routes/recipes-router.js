import { Router } from "express";
import validateBody from "../middleware/validateBody.js";
import authenticate from "../middleware/authenticate.js";
import recipesControllers from "../controllers/recipesControllers.js";
import favoriteRecipesControllers from "../controllers/favoriteRecipesControllers.js";
import { createRecipeSchema } from "../schemas/recipesSchemas.js";

const validateRequestBody = validateBody(createRecipeSchema);
const recipesRouter = Router();

recipesRouter.get("/my-recipes", authenticate, recipesControllers.getUserRecipes);

recipesRouter.get("/popular", recipesControllers.getPopularRecipes);

recipesRouter.get("/favorite", authenticate, recipesControllers.getFavoriteRecipes);

recipesRouter.delete(":id/favorite", authenticate, favoriteRecipesControllers.deleteFavoriteRecipe);

recipesRouter.delete("/:id", authenticate, recipesControllers.deleteRecipe);

recipesRouter.get("/:id", recipesControllers.getOneRecipe);

recipesRouter.post("/", authenticate, validateRequestBody, recipesControllers.createRecipe);

recipesRouter.get("/", recipesControllers.getAllRecipes);

export default recipesRouter;
