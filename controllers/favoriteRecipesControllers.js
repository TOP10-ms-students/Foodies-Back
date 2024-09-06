import ctrlWrapper from "../middleware/ctrlWrapper.js";
import favoriteRecipesServices from "../services/favoriteRecipesServices.js";
import { ApiError } from "../errors/apiError.js";

const deleteFavoriteRecipe = async (req, res) => {
    const { id: recipeId } = req.params;
    const { id: owner } = req.user;

    try {
        await favoriteRecipesServices.removeFavoriteRecipe({ id: recipeId, owner });
        res.json({ message: `Recipe with id ${recipeId} removed from Favorites successfully` });
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
