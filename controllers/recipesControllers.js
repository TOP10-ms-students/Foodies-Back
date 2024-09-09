import { ApiError } from "../errors/apiError.js";
import ctrlWrapper from "../middleware/ctrlWrapper.js";
import recipesServices from "../services/recipesServices.js";
import appConfig from "../config/appConfig.js";
import db from "../db/models/index.cjs";

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
    const { limit = appConfig.DEFAULT_LIMIT } = req.query;

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
    return res.json(favorite);
};

const deleteFavoriteRecipe = async (req, res) => {
    const { id: recipeId } = req.params;
    const { id: owner } = req.user;

    await recipesServices.removeFavoriteRecipe({ id: recipeId, owner });
    res.json({ success: true });
};

const createRecipe = async (req, res) => {
    const { id: owner } = req.user;

    const newRecipe = await recipesServices.postRecipe({ ...req.body, owner });
    const [ownerData, categoryData, areaData] = await Promise.all([
        db.Users.findByPk(newRecipe.owner, { attributes: ["id", "name", "email"] }),
        db.Categories.findByPk(newRecipe.category, { attributes: ["id", "name"] }),
        db.Areas.findByPk(newRecipe.area, { attributes: ["id", "name"] }),
    ]);

    const recipeWithAssociations = {
        ...newRecipe.toJSON(),
        owner: ownerData,
        category: categoryData,
        area: areaData,
    };
    res.status(201).json(recipeWithAssociations);
};

export default {
    getAllRecipes: ctrlWrapper(getAllRecipes),
    getOneRecipe: ctrlWrapper(getOneRecipe),
    createRecipe: ctrlWrapper(createRecipe),
    getPopularRecipes: ctrlWrapper(getPopularRecipes),
    deleteRecipe: ctrlWrapper(deleteRecipe),
    deleteFavoriteRecipe: ctrlWrapper(deleteFavoriteRecipe),
    getUserRecipes: ctrlWrapper(getUserRecipes),
    getFavoriteRecipes: ctrlWrapper(getFavoriteRecipes),
    toggleFavoriteRecipe: ctrlWrapper(toggleFavoriteRecipe),
};
