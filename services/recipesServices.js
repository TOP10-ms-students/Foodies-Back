import db from "../db/index.js";
import { AppError, errorTypes } from "../errors/appError.js";
import recipeRepository from "../repository/recipeRepository.js";

const postRecipe = data => db.Recipe.create(data);

const deleteUserRecipe = async (userId, recipeId) => {
    const recipe = await recipeRepository.getOneRecipe({ id: recipeId, owner: userId });

    if (!recipe) {
        return new AppError(errorTypes.NOT_FOUND);
    }

    await recipe.destroy();
    return true;
};

const toggleFavoriteRecipe = async data => {
    const { userId, recipeId } = data;

    const existingFavorite = await db.FavoriteRecipe.findOne({
        where: { userId, recipeId },
    });

    if (existingFavorite) {
        await db.FavoriteRecipe.destroy({
            where: { userId, recipeId },
        });
        return false;
    }

    await db.FavoriteRecipe.create(data);
};

const removeFavoriteRecipe = async ({ id, owner }) => {
    await db.FavoriteRecipe.destroy({
        where: { recipeId: id, userId: owner },
    });
    return true;
};

export default {
    postRecipe,
    deleteUserRecipe,
    removeFavoriteRecipe,
    toggleFavoriteRecipe,
};
