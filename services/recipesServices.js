import db from "../db/index.js";
import { AppError, errorTypes } from "../errors/appError.js";
import recipeRepository from "../repository/recipeRepository.js";
import cloudinaryStorage from "../helpers/cloudinaryStorage.js";
import { RECIPE_CLOUDINARY_STORAGE_DIR } from "../constants/recipeConstants.js";

const createRecipe = async (user, data, img) => {
    const { ingredients, ...otherData } = data;

    const thumb = await cloudinaryStorage.upload(img, RECIPE_CLOUDINARY_STORAGE_DIR);
    const recipe = await db.Recipe.create({ ...otherData, thumb, ownerId: user.id });

    await db.RecipeIngredient.bulkCreate(ingredients.map(ingredient => ({ ...ingredient, recipeId: recipe.id })));

    return await recipeRepository.getRecipe({ id: recipe.id });
};

const deleteRecipe = async (userId, recipeId) => {
    const recipe = await recipeRepository.findRecipeById(recipeId);

    if (!recipe) throw new AppError(errorTypes.NOT_FOUND, 'Recipe not found');
    if (recipe.ownerId !== userId) throw new AppError(errorTypes.ALREADY_VERIFIED, 'You can remove only your recipe');

    await recipe.destroy();
};

const addFavoriteRecipe = async (owner, id) => {
    const recipe = await recipeRepository.findRecipeById(id);

    if (!recipe) throw new AppError(errorTypes.NOT_FOUND, "Recipe not exist");

    const isFavorite = await owner.hasFavoriteRecipes(recipe);

    if (isFavorite) throw new AppError(errorTypes.ALREADY_EXIST, "This recipe already added to favorite");

    await owner.addFavoriteRecipes(recipe);
};

const removeFavoriteRecipe = async (owner, id) => {
    const recipe = await recipeRepository.findRecipeById(id);

    if (!recipe) throw new AppError(errorTypes.NOT_FOUND, "Recipe not exist");

    const isFavorite = await owner.hasFavoriteRecipes(recipe);

    if (!isFavorite) throw new AppError(errorTypes.ALREADY_EXIST, "This recipe isn`t your favorite");

    await owner.removeFavoriteRecipes(recipe);
};

export default {
    createRecipe,
    deleteRecipe,
    removeFavoriteRecipe,
    addFavoriteRecipe,
};
