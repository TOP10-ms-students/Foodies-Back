import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import recipesControllers from "../controllers/recipesControllers.js";

const recipesRouter = Router();

recipesRouter.delete("/favorite/:id", authenticate, recipesControllers.deleteFavoriteRecipe);

export default recipesRouter;
