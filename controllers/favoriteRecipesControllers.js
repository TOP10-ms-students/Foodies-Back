import ctrlWrapper from "../middleware/ctrlWrapper.js";
import recipesServices from "../services/recipesServices.js";

async function getFavoriteRecipes(req, res) {
    const { id: userId } = req.user;
    const favoriteList = await recipesServices.getFavorites({ userId });
    res.json({
        favoriteRecipes: favoriteList,
    });
}

const recipesController = {
    getFavoriteRecipes: ctrlWrapper(getFavoriteRecipes),
};

export default recipesController;