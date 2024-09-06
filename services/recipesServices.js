import db from "../db/models/index.cjs";
import { AppError, errorTypes } from "../errors/appError.js";

const removeFavoriteRecipe = async ({ id, owner }) => {
    const existingFavorite = await db.FavoriteRecipes.findOne({
        where: { recipe_id: id, user_id: owner },
    });

    if (!existingFavorite) {
        throw new AppError(errorTypes.NOT_FOUND, `Favorite recipe with id ${id} not found for user ${owner}`);
    }

    await db.FavoriteRecipes.destroy({
        where: { recipe_id: id, user_id: owner },
    });

    return { message: `Favorite recipe with id ${id} removed successfully` };
};

export default {
    removeFavoriteRecipe,
};
