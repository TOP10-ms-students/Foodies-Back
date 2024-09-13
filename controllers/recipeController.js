import { ApiError } from "../errors/apiError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import recipesServices from "../services/recipesServices.js";
import { normalizePaginationParams } from "../helpers/normalizePaginationParams.js";
import recipeRepository from "../repository/recipeRepository.js";

const getRecipeList = async (req, res) => {
    const { page, limit, category, ingredient, area } = req.query;

    const query = {
        categoryId: category,
        areaId: area,
        ingredientId: ingredient,
    };

    const { count, rows: recipes } = await recipeRepository.findRecipes(query, normalizePaginationParams(page, limit), req.user);

    res.json({ count, recipes });
};

const getOneRecipe = async (req, res) => {
    const { id } = req.params;

    const recipe = await recipeRepository.getRecipe({ id }, req.user);

    res.json({ recipe });
};

const getMyRecipes = async (req, res) => {
    const { id: ownerId } = req.user;
    const { page, limit } = req.query;

    const { count, rows: recipes } = await recipeRepository.findRecipes({ ownerId }, normalizePaginationParams(page, limit), req.user);

    res.json({ count, recipes });
};

const getPopularRecipeList = async (req, res) => {
    const { limit = 4 } = req.query;

    const recipes = await recipeRepository.popularRecipeList(limit, req.user);

    res.json({ recipes });
};

const getFavoriteRecipeList = async (req, res) => {
    const { id } = req.user;
    const { page, limit } = req.query;

    const { count, rows: recipes } = await recipeRepository.findFavorites(id, normalizePaginationParams(page, limit));

    res.json({ count, recipes });
};

const addFavoriteRecipe = async (req, res) => {
    const { id: recipeId } = req.params;

    await recipesServices.addFavoriteRecipe(req.user, recipeId);

    res.json({ message: 'Success' });
};

const deleteFavoriteRecipe = async (req, res) => {
    const { id: recipeId } = req.params;

    await recipesServices.removeFavoriteRecipe(req.user, recipeId);

    res.json({ message: 'Success' });
};

const createRecipe = async (req, res) => {
    const thumb = req.file;

    if (!thumb) throw new ApiError(400, 'Thumb is required');

    try {
        const recipe = await recipesServices.createRecipe(req.user, req.body, thumb);

        res.status(201).json({ recipe });
    } catch (error) {
        throw new ApiError(400, 'Invalid data');
    }
};

const deleteRecipe = async (req, res) => {
    const { id: userId } = req.user;
    const { id: recipeId } = req.params;

    await recipesServices.deleteRecipe(userId, recipeId);

    res.json({ message: "Success" });
};

export default {
    getRecipeList: ctrlWrapper(getRecipeList),
    getOneRecipe: ctrlWrapper(getOneRecipe),
    createRecipe: ctrlWrapper(createRecipe),
    getPopularRecipeList: ctrlWrapper(getPopularRecipeList),
    deleteRecipe: ctrlWrapper(deleteRecipe),
    deleteFavoriteRecipe: ctrlWrapper(deleteFavoriteRecipe),
    getMyRecipes: ctrlWrapper(getMyRecipes),
    getFavoriteRecipeList: ctrlWrapper(getFavoriteRecipeList),
    addFavoriteRecipe: ctrlWrapper(addFavoriteRecipe),
};
