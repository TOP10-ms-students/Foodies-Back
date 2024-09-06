import ctrlWrapper from "../middleware/ctrlWrapper.js";
import favoriteRecipesServices from "../services/favoriteRecipesServices.js";

const deleteFavoriteRecipe = async (req, res) => {
    const { id: recipeId } = req.params;
    const { id: owner } = req.user;

    await favoriteRecipesServices.removeFavoriteRecipe({ id: recipeId, owner });
    res.json({ message: `Recipe with id ${recipeId} removed from Favorites successfully` });
};

export default {
    deleteFavoriteRecipe: ctrlWrapper(deleteFavoriteRecipe),
};