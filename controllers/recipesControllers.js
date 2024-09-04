import db from "../db/models/index.cjs";
import ctrlWrapper from "../middleware/ctrlWrapper.js";
import * as recipesServices from "../services/recipesServices.js";

const addFavoriteRecipes = async (req, res) => {
    const { id: userId } = req.user;
    const { id: recipeId } = req.params;

    const existingFavorite = await db.Favorite.findOne({
        where: { recipeId },
    });

    if (existingFavorite) {
        return db.Favorite.destroy({
            where: { recipeId },
        });
    }

    const favorite = await recipesServices.addFavorietsRecipes({ userId, recipeId });
    return res.json(favorite);
};

export default {
    addFavoriteRecipes: ctrlWrapper(addFavoriteRecipes),
};
