import db from "../db/models/index.cjs";
import recipesConfig from "../config/config.js";
import { ApiError } from "../errors/apiError.js";

const listRecipes = (query = {}, { page: _page, limit: _limit }) => {
    const { category, ingredient, area } = query;
    const { DEFAULT_PAGE, DEFAULT_LIMIT } = recipesConfig;

    const page = isNaN(Number(_page)) ? DEFAULT_PAGE : Number(_page);
    const limit = isNaN(Number(_limit)) ? DEFAULT_LIMIT : Number(_limit);

    const where = {};
    if (category) {
        where.category = category;
    }
    if (area) {
        where.area = area;
    }

    const ingredientFilter = {
        model: db.Ingredients,
        where: { id: ingredient },
        through: { attributes: [] },
    };

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



export default {
    listRecipes,
    getOneRecipe,
};
