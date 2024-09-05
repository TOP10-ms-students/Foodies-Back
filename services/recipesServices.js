import db from "../db/models/index.cjs";

const removeFavoriteRecipe = async ({ id, owner }) => {
    const existingFavorite = await db.FavoriteRecipes.findOne({
        where: { recipeId: id, userId: owner },
        rejectOnEmpty: true,
    });

    await db.FavoriteRecipes.destroy({
        where: { recipeId: id, userId: owner },
    });

    return true;
};

export default {
    removeFavoriteRecipe,
};
