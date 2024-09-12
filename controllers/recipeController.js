import { ApiError } from "../errors/apiError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import recipesServices from "../services/recipesServices.js";
import db from "../db/index.js";
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

    const { ingredients, ...recipeData } = req.body;

    const newRecipe = await recipesServices.postRecipe({ ...recipeData, owner });

    const newIngredients = await db.RecipeIngredient.bulkCreate(ingredients.map(i => ({ ...i, recipeId: newRecipe.id })));

    const [ownerData, categoryData, areaData] = await Promise.all([
        db.User.findByPk(newRecipe.owner, { attributes: ["id", "name", "email"] }),
        db.Category.findByPk(newRecipe.category, { attributes: ["id", "name"] }),
        db.Area.findByPk(newRecipe.area, { attributes: ["id", "name"] }),
    ]);

    const recipeWithAssociations = {
        ...newRecipe.toJSON(),
        ingredients: newIngredients,
        owner: ownerData,
        category: categoryData,
        area: areaData,
    };
    res.status(201).json(recipeWithAssociations);
};

export default {
    getRecipeList: ctrlWrapper(getRecipeList),
    getOneRecipe: ctrlWrapper(getOneRecipe),
    createRecipe: ctrlWrapper(createRecipe),
    getPopularRecipes: ctrlWrapper(getPopularRecipes),
    deleteRecipe: ctrlWrapper(deleteRecipe),
    deleteFavoriteRecipe: ctrlWrapper(deleteFavoriteRecipe),
    getUserRecipes: ctrlWrapper(getUserRecipes),
    getFavoriteRecipes: ctrlWrapper(getFavoriteRecipes),
    toggleFavoriteRecipe: ctrlWrapper(toggleFavoriteRecipe),
};
