import { Router } from "express";
import validateBody from "../middleware/validateBody.js";
import authenticate from "../middleware/authenticate.js";
import recipesControllers from "../controllers/recipesControllers.js";
import { createRecipeSchema } from "../schemas/recipesSchemas.js";

const validateRequestBody = validateBody(createRecipeSchema);
const recipesRouter = Router();

recipesRouter.delete("/:id", authenticate, recipesControllers.deleteRecipe);

recipesRouter.get("/my-recipes", authenticate, recipesControllers.getUserRecipes);

recipesRouter.get("/", recipesControllers.getAllRecipes);

recipesRouter.get("/popular", recipesControllers.getPopularRecipes);

recipesRouter.get("/favorite", authenticate, recipesControllers.getFavoriteRecipes);

recipesRouter.get("/:id", recipesControllers.getOneRecipe);

recipesRouter.post("/", authenticate, validateRequestBody, recipesControllers.createRecipe);

export default recipesRouter;
