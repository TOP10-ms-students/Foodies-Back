import { Sequelize } from "sequelize";
import db from "../db/models/index.cjs";
import { AppError, errorTypes } from "../errors/appError.js";
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
          }
        : {
              model: db.Ingredients,
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
            include: [{ model: db.Ingredients }],
        });
    } catch (error) {
        if (error instanceof db.Sequelize.EmptyResultError) {
            throw new ApiError(404, "Recipe not found with the given query");
        }
        throw error;
    }
};

const postRecipe = data => db.Recipes.create(data);

const getFavorites = userId => {
    const favoriteList = db.FavoriteRecipes.findAll({
        where: { userId },
    });

    return favoriteList;
};

const listPopularRecipes = ({ limit }) => {
    return db.Recipes.findAll({
        attributes: [
            "id",
            "title",
            "category",
            "owner",
            "area",
            "instructions",
            "description",
            "thumb",
            "time",
            [Sequelize.fn("COUNT", Sequelize.col("Users.id")), "favorite_count"],
        ],
        include: [
            {
                model: db.Users,
                attributes: ["id", "name", "avatar", "email"],
                through: { attributes: [] },
                require: false,
            },
        ],
        subQuery: false,
        group: ["Recipes.id", "Users.id"],
        order: [[Sequelize.literal("favorite_count"), "DESC"]],
        limit: Number(limit),
    });
};

const findAllUserRecipes = query => db.Recipes.findAll({ where: query });

const deleteUserRecipe = async (userId, recipeId) => {
    const recipe = await getOneRecipe({ id: recipeId, owner: userId });

    if (!recipe) {
        return new AppError(errorTypes.NOT_FOUND);
    }

    await recipe.destroy();
    return true;
};

const toggleFavoriteRecipe = async data => {
    const { userId, recipeId } = data;

    const existingFavorite = await db.FavoriteRecipes.findOne({
        where: { userId, recipeId },
    });

    if (existingFavorite) {
        await db.FavoriteRecipes.destroy({
            where: { userId, recipeId },
        });
        return false;
    }

    await db.FavoriteRecipes.create(data);
};

const removeFavoriteRecipe = async ({ id, owner }) => {
    await db.FavoriteRecipes.destroy({
        where: { recipeId: id, userId: owner },
    });
    return true;
};

export default {
    listRecipes,
    getOneRecipe,
    postRecipe,
    listPopularRecipes,
    deleteUserRecipe,
    removeFavoriteRecipe,
    findAllUserRecipes,
    getFavorites,
    toggleFavoriteRecipe,
};
