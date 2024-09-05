import db from "../db/models/index.cjs";
import appConfig from "../config/appConfig.js";
import { ApiError } from "../errors/apiError.js";

const listRecipes = (query = {}, { page: _page, limit: _limit }) => {
    const { category, ingredient, area } = query;

    const page = Number(_page) || appConfig.DEFAULT_PAGE;
    const limit = Number(_limit) || appConfig.DEFAULT_LIMIT;

    const where = {};
    if (category) {
        where.category = category;
    }
    if (area) {
        where.area = area;
    }

    const ingredientFilter = ingredient
        ? {
              model: db.Ingredients,
              where: { id: ingredient },
              through: { attributes: [] },
          }
        : null;

    return db.Recipes.findAll({
        where,
        include: ingredientFilter ? [ingredientFilter] : [],
        order: [["id", "desc"]],
        limit,
        offset: (page - 1) * limit,
    });
};


const getOneRecipe = async query => {
    try {
        return await db.Recipes.findOne({
            where: query,
            rejectOnEmpty: true,
        });
    } catch (error) {
        if (error instanceof db.Sequelize.EmptyResultError) {
            throw new ApiError(404, "Recipe not found with the given query");
        }
        throw error;
    }
};



const addFavoriteRecipe = async data => {
    const { recipeId } = data;

    const existingFavorite = await db.FavoriteRecipes.findOne({
        where: { recipeId },
    });

    if (existingFavorite) {
        await db.FavoriteRecipes.destroy({
            where: { recipeId },
        });
        return { message: "Recipe removed from favorites" };
    }

    await db.FavoriteRecipes.create(data);
};

export default {
    listRecipes,
    getOneRecipe,
    addFavoriteRecipe,
};