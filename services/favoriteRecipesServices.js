import db from "../db/models/index.cjs";

const removeFavoriteRecipe = async ({ id, owner }) => {
    await db.FavoriteRecipes.findOne({
        where: { recipeId: id, userId: owner },
    });

    await db.FavoriteRecipes.destroy({
        where: { recipeId: id, userId: owner },
    });
};

export default {
    removeFavoriteRecipe,
};
