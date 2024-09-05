import { ApiError } from "../errors/apiError.js";
import ctrlWrapper from "../middleware/ctrlWrapper.js";
import recipesServices from "../services/recipesServices.js";

const getAllRecipes = async (req, res) => {
    const { page = 1, limit = 10, category, ingredient, area } = req.query;

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
    
}

const getUserRecipes = async (req, res) => {
    const { id: userId } = req.user;
    const recipes = await recipesServices.findAllUserRecipes({ owner: userId });

    return res.json(recipes);
};

export default {
    getAllRecipes: ctrlWrapper(getAllRecipes),
    getOneRecipe: ctrlWrapper(getOneRecipe),
    deleteRecipe: ctrlWrapper(deleteRecipe),
    getUserRecipes: ctrlWrapper(getUserRecipes),
};
