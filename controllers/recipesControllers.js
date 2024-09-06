import ctrlWrapper from "../middleware/ctrlWrapper.js";
import recipesServices from "../services/recipesServices.js";
import { ApiError } from "../errors/apiError.js";

const deleteFavoriteRecipe = async (req, res) => {
    const { id: recipeId } = req.params;
    const { id: owner } = req.user;

    try {
        await recipesServices.removeFavoriteRecipe({ id: recipeId, owner });
        res.json({ message: `Your favorite recipe with id ${recipeId} removed successfully` });
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.status).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unexpected error occurred." });
        }
    }
};

export default {
    deleteFavoriteRecipe: ctrlWrapper(deleteFavoriteRecipe),
};
