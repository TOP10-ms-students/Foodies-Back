import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import recipesControllers from "../controllers/recipesControllers.js";

const recipesRouter = Router();

recipesRouter.use(authenticate);

recipesRouter.get("/", recipesControllers.getAllRecipes);

recipesRouter.get("/:id", recipesControllers.getOneRecipe);

recipesRouter.post("/:id/favorite", recipesControllers.addFavoriteRecipes);

export default recipesRouter;
