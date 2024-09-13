import { Router } from "express";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../middleware/authenticate.js";
import recipeController from "../controllers/recipeController.js";
import { createRecipeSchema } from "../schemas/recipesSchemas.js";
import upload from "../middleware/upload.js";

const recipeRouter = Router();

recipeRouter.get("/my", authenticate, recipeController.getMyRecipes);

recipeRouter.get("/popular", recipeController.getPopularRecipeList);

recipeRouter.get("/favorite", authenticate, recipeController.getFavoriteRecipes);

recipeRouter.delete("/:id/favorite", authenticate, recipeController.deleteFavoriteRecipe);

recipeRouter.delete("/:id", authenticate, recipeController.deleteRecipe);

recipeRouter.get("/:id", recipeController.getOneRecipe);

recipeRouter.delete(":id/favorite", authenticate, recipeController.deleteFavoriteRecipe);

recipeRouter.post("/:id/favorite", authenticate, recipeController.toggleFavoriteRecipe);

recipeRouter.post("/", authenticate, upload.single("thumb"), validateBody(createRecipeSchema), recipeController.createRecipe);

recipeRouter.get("/", recipeController.getRecipeList);

export default recipeRouter;
