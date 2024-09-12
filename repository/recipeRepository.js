import db from "../db/index.js";
import { ApiError } from "../errors/apiError.js";
import { Sequelize } from "sequelize";
import clearQueryData from "../helpers/clearQueryData.js";

const findRecipes = (query = {}, { offset, limit }) => {
    const { ingredientId, ...whereCondition } = clearQueryData(query);

    return db.Recipe.findAndCountAll({
        attributes: ["id", "title", "description"],
        where: whereCondition,
        include: [
            {
                model: db.Ingredient,
                as: 'ingredients',
                where: ingredientId ? { id: ingredientId } : {},
                attributes: [],
            },
            {
                model: db.User,
                as: 'owner',
                attributes: ["id", "name", "avatar", "email"],
            },
        ],
        order: [["id", "desc"]],
        limit,
        offset,
    });
};

const getOneRecipe = async query => {
    try {
        return await db.Recipe.findOne({
            where: query,
            rejectOnEmpty: true,
            include: [{ model: db.Ingredient }],
        });
    } catch (error) {
        if (error instanceof db.Sequelize.EmptyResultError) {
            throw new ApiError(404, "Recipe not found with the given query");
        }
        throw error;
    }
};

const getFavorites = userId => {
    const favoriteList = db.FavoriteRecipe.findAll({
        where: { userId },
    });

    return favoriteList;
};

const listPopularRecipes = ({ limit }) => {
    return db.Recipe.findAll({
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
                model: db.User,
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

const findAllUserRecipes = query => db.Recipe.findAll({ where: query });

export default {
    findRecipes,
    getOneRecipe,
    listPopularRecipes,
    findAllUserRecipes,
    getFavorites,
};