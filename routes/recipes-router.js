import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import recipesControllers from "../controllers/recipesControllers.js";

const recipesRouter = Router();

recipesRouter.post("/:id/favorite", authenticate, recipesControllers.addFavoriteRecipes);

export default recipesRouter;
