import { ApiError } from "../errors/apiError.js";
import ctrlWrapper from "../middleware/ctrlWrapper.js";
import recipesServices from "../services/recipesServices.js";
import appConfig from "../config/appConfig.js";

const getAllRecipes = async (req, res) => {
    const { page = appConfig.DEFAULT_PAGE, limit = appConfig.DEFAULT_LIMIT, category, ingredient, area } = req.query;

    const query = {
        category,
        ingredient,
        area,
    };

    const result = await recipesServices.listRecipes(query, { page, limit });
    res.json(result);
};

const getOneRecipe = async (req, res) => {
    const { id } = req.params;
    const result = await recipesServices.getOneRecipe({ id });
    if (!result) {
        throw new ApiError(404, `Recipe with id=${id} not found`);
    }
    res.json(result);
};

const deleteRecipe = async (req, res) => {
    const { id: userId } = req.user;

    const { id: recipeId } = req.params;

    const result = await recipesServices.deleteUserRecipe(userId, recipeId);

    if (!result) {
        return new ApiError(404, `Recipe with id=${recipeId} not found in your recipes`);
    }

    return res.json({ message: "Recipe deleted successfully." });
};

const getUserRecipes = async (req, res) => {
    const { id: userId } = req.user;
    const recipes = await recipesServices.findAllUserRecipes({ owner: userId });

    return res.json(recipes);
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

const createRecipe = async (req, res) => {};

export default {
    getAllRecipes: ctrlWrapper(getAllRecipes),
    getOneRecipe: ctrlWrapper(getOneRecipe),
    createRecipe: ctrlWrapper(createRecipe),
    getPopularRecipes: ctrlWrapper(getPopularRecipes),
    deleteRecipe: ctrlWrapper(deleteRecipe),
    getUserRecipes: ctrlWrapper(getUserRecipes),
    getFavoriteRecipes: ctrlWrapper(getFavoriteRecipes),
};
