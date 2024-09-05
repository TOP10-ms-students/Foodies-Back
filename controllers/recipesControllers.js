import ctrlWrapper from "../middleware/ctrlWrapper.js";
import recipesServices from "../services/recipesServices.js";

const deleteFavoriteRecipe = async (req, res) => {
    const { id: recipeId } = req.params;
    const { id: owner } = req.user;

    await recipesServices.removeFavoriteRecipe({ id: recipeId, owner });

    res.json({ message: `Your favorite recipe with id ${recipeId} removed successfully` });
};

export default {
    deleteFavoriteRecipe: ctrlWrapper(deleteFavoriteRecipe),
};
