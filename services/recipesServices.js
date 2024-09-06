import db from "../db/models/index.cjs";
import { AppError, errorTypes } from "../errors/appError.js";

const removeFavoriteRecipe = async ({ id, owner }) => {
    const existingFavorite = await db.FavoriteRecipes.findOne({
        where: { recipe_id: id, user_id: owner },
    });

    if (!existingFavorite) {
        throw new AppError(errorTypes.NOT_FOUND, `Recipe with id ${id} not found in Favorites for user ${owner}`);
    }

    await db.FavoriteRecipes.destroy({
        where: { recipe_id: id, user_id: owner },
    });

    return { message: `Recipe with id ${id} removed from Favorites successfully` };
};

export default {
    removeFavoriteRecipe,
};
