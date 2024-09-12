import db from "../db/index.js";
import { ApiError } from "../errors/apiError.js";
import { EmptyResultError, Sequelize } from "sequelize";
import clearQueryData from "../helpers/clearQueryData.js";

const findRecipes = (query = {}, { offset, limit }) => {
    const { ingredientId, ...whereCondition } = clearQueryData(query);

    return db.Recipe.findAndCountAll({
        attributes: ["id", "title", "description", "thumb"],
        where: whereCondition,
        include: [
            {
                model: db.Ingredient,
                as: "ingredients",
                where: ingredientId ? { id: ingredientId } : {},
                attributes: [],
            },
            {
                model: db.User,
                as: "owner",
                attributes: ["id", "name", "avatar"],
            },
        ],
        order: [["id", "desc"]],
        distinct:true,
        limit,
        offset,
    });
};

const getRecipe = async query => {
    try {
        const data = await db.Recipe.findOne({
            attributes: ["id", "title", "description", "time", "instructions", "thumb"],
            where: query,
            include: [
                {
                    model: db.Ingredient,
                    as: "ingredients",
                    attributes: ["id", "name", "img"],
                    through: {
                        attributes: ["measure"],
                    }
                },
                {
                    model: db.Category,
                    as: "category",
                    attributes: ["name"],
                },
                {
                    model: db.User,
                    as: "owner",
                    attributes: ["id", "name", "avatar"],
                },
            ],
            rejectOnEmpty: true,
        });

        const recipeJSON = data.toJSON();

        const ingredients = recipeJSON.ingredients.map(ingredient => {
            return {
                id: ingredient.id,
                name: ingredient.name,
                img: ingredient.img,
                measure: ingredient.RecipeIngredient ? ingredient.RecipeIngredient.measure : null,
            };
        });

        return {
            ...recipeJSON,
            ingredients,
        };
    } catch (error) {
        if (error instanceof EmptyResultError) {
            throw new ApiError(404, "Recipe not found");
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
    getRecipe,
    listPopularRecipes,
    findAllUserRecipes,
    getFavorites,
};