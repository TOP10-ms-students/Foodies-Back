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

    const { count, rows: recipes } = await recipeRepository.findRecipes(query, normalizePaginationParams(page, limit));

    res.json({ count, recipes });
};

const getOneRecipe = async (req, res) => {
    const { id } = req.params;

    const recipe = await recipeRepository.getRecipe({ id });

    res.json({ recipe });
};

const getMyRecipes = async (req, res) => {
    const { id: ownerId, page, limit } = req.user;

    const { count, rows: recipes } = await recipeRepository.findRecipes({ ownerId }, normalizePaginationParams(page, limit));

    res.json({ count, recipes });
};

const getPopularRecipes = async (req, res) => {
    const { limit = 4 } = req.query;

    const result = await recipesServices.listPopularRecipes({ limit });

    res.json(result);
};

const getFavoriteRecipes = async (req, res) => {
    const { id: userId } = req.user;
    const favoriteList = await recipesServices.getFavorites(userId);
    res.json({
        favoriteRecipes: favoriteList,
    });
};

const toggleFavoriteRecipe = async (req, res) => {
    const { id: userId } = req.user;
    const { id: recipeId } = req.params;

    const favorite = await recipesServices.toggleFavoriteRecipe({ userId, recipeId });

    res.json(favorite);
};

const deleteFavoriteRecipe = async (req, res) => {
    const { id: recipeId } = req.params;
    const { id: owner } = req.user;

    await recipesServices.removeFavoriteRecipe({ id: recipeId, owner });
    res.json({ success: true });
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
    getPopularRecipes: ctrlWrapper(getPopularRecipes),
    deleteRecipe: ctrlWrapper(deleteRecipe),
    deleteFavoriteRecipe: ctrlWrapper(deleteFavoriteRecipe),
    getMyRecipes: ctrlWrapper(getMyRecipes),
    getFavoriteRecipes: ctrlWrapper(getFavoriteRecipes),
    toggleFavoriteRecipe: ctrlWrapper(toggleFavoriteRecipe),
};
