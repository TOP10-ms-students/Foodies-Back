import db, { sequelize } from "../db/index.js";
import { ApiError } from "../errors/apiError.js";
import { EmptyResultError, Sequelize } from "sequelize";
import clearQueryData from "../helpers/clearQueryData.js";

const addIsFavorite = currentUser => [
    currentUser
        ? Sequelize.literal(`
            EXISTS (
                SELECT 1
                FROM "favorite_recipes" fr
                WHERE fr.recipe_id = "Recipe"."id" 
                AND fr.user_id = ${sequelize.escape(currentUser.id)}
            )
        `)
        : Sequelize.literal(`FALSE`),
    "isFavorite"
]

const findRecipes = (query = {}, { offset, limit }, currentUser) => {
    const { ingredientId, ...whereCondition } = clearQueryData(query);

    return db.Recipe.findAndCountAll({
        attributes: [
            "id",
            "title",
            "description",
            "thumb",
            addIsFavorite(currentUser),
        ],
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

const getRecipe = async (query, currentUser) => {
    try {
        const data = await db.Recipe.findOne({
            attributes: [
                "id",
                "title",
                "description",
                "time",
                "instructions",
                "thumb",
                addIsFavorite(currentUser),
            ],
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

const findFavorites = async (userId, { offset, limit }) => {
    return await db.Recipe.findAndCountAll({
        attributes: ["id", "title", "description", "thumb"],
        include: [
            {
                model: db.User,
                as: 'favorite',
                attributes: [],
                through: { attributes: [] },
                where: { id: userId },
                required: true,
            }
        ],
        order: [["id", "desc"]],
        distinct:true,
        limit,
        offset,
    });
};

const popularRecipeList = (limit, currentUser) => {
    return db.Recipe.findAll({
        attributes: [
            "id",
            "title",
            "description",
            "thumb",
            [Sequelize.fn("COUNT", Sequelize.col("favorite.id")), "favorite_count"],
            addIsFavorite(currentUser),
        ],
        include: [
            {
                model: db.User,
                as: 'owner',
                attributes: ["id", "name", "avatar"],
            },
            {
                model: db.User,
                as: 'favorite',
                attributes: [],
                through: { attributes: [] },
            }
        ],
        subQuery: false,
        group: ["Recipe.id", "owner.id"],
        order: [[Sequelize.literal("favorite_count"), "DESC"]],
        limit: Number(limit),
    });
};

const findRecipeById = async id => db.Recipe.findByPk(id);

export default {
    findRecipes,
    getRecipe,
    popularRecipeList,
    findFavorites,
    findRecipeById,
};