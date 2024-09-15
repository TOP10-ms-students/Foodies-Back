import { Router } from "express";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../middleware/authenticate.js";
import recipeController from "../controllers/recipeController.js";
import { createRecipeSchema } from "../schemas/recipesSchemas.js";
import upload from "../middleware/upload.js";
import optionalAuthenticate from "../middleware/optionalAuthenticate.js";

const recipeRouter = Router();

recipeRouter.get("/my", authenticate, recipeController.getMyRecipes);

recipeRouter.get("/popular", optionalAuthenticate, recipeController.getPopularRecipeList);

recipeRouter.get("/favorite", authenticate, recipeController.getFavoriteRecipeList);

recipeRouter.delete("/:id/favorite", authenticate, recipeController.deleteFavoriteRecipe);

recipeRouter.delete("/:id", authenticate, recipeController.deleteRecipe);

recipeRouter.get("/:id", optionalAuthenticate, recipeController.getOneRecipe);

recipeRouter.post("/:id/favorite", authenticate, recipeController.addFavoriteRecipe);

recipeRouter.post("/", authenticate, upload.single("thumb"), validateBody(createRecipeSchema), recipeController.createRecipe);

recipeRouter.get("/", optionalAuthenticate, recipeController.getRecipeList);

export default recipeRouter;
