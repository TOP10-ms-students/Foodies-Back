import db from "../db/index.js";
import { AppError, errorTypes } from "../errors/appError.js";
import recipeRepository from "../repository/recipeRepository.js";

const createRecipe = async (user, data) => {
    const { ingredients, ...otherData } = data;

    const recipe = await db.Recipe.create({ ...otherData, ownerId: user.id });

    await db.RecipeIngredient.bulkCreate(ingredients.map(ingredient => ({ ...ingredient, recipeId: recipe.id })));

    return await recipeRepository.getRecipe({ id: recipe.id });
};

const deleteRecipe = async (userId, recipeId) => {
    const recipe = await recipeRepository.findRecipes({ id: recipeId, owner: userId });

    if (!recipe) {
        return new AppError(errorTypes.NOT_FOUND, 'Recipe not found');
    }

    await recipe.destroy();
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
    createRecipe,
    deleteRecipe,
    removeFavoriteRecipe,
    toggleFavoriteRecipe,
};
