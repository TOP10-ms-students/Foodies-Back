import { Sequelize } from "sequelize";
import db from "../db/models/index.cjs";

const listRecipes = (query = {}, { page, limit }) => {
    const { category, ingredient, area } = query;

    const where = {};
    if (category) {
        where.category = category;
    }
    if (area) {
        where.area = area;
    }

    return db.Recipes.findAll({
        where,
        include: ingredient
            ? [
                  {
                      model: db.Ingredients,
                      where: { id: ingredient },
                      through: { attributes: [] },
                  },
              ]
            : [],
        order: [["id", "desc"]],
        limit: Number(limit),
        offset: Number(page - 1) * Number(limit),
    });
};

const getOneRecipe = query => db.Recipes.findOne({ where: query });

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
                model: db.Ingredients,
                through: { attributes: [] },
            },
            {
                model: db.Users,
                through: { attributes: [] },
                require: false,
            },
        ],
        subQuery: false,
        group: ["Recipes.id", "Users.id", "Ingredients.id"],
        order: [[Sequelize.literal("favorite_count"), "DESC"]],
        limit: Number(limit),
    });
};

export default {
    listRecipes,
    getOneRecipe,
    listPopularRecipes,
};
