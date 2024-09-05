import { ApiError } from "../errors/apiError.js";
import ctrlWrapper from "../middleware/ctrlWrapper.js";
import recipesServices from "../services/recipesServices.js";
import recipesConfig from "../config/config.js";

const getAllRecipes = async (req, res) => {
  const { DEFAULT_PAGE, DEFAULT_LIMIT } = recipesConfig;

  const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, category, ingredient, area } = req.query;

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

export default {
    getAllRecipes: ctrlWrapper(getAllRecipes),
    getOneRecipe: ctrlWrapper(getOneRecipe),
};
