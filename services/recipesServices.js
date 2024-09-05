import db from "../db/models/index.cjs";
import { AppError, errorTypes } from "../errors/appError.js";

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

const findAllUserRecipes = query => db.Recipes.findAll({ where: query });

const deleteUserRecipe = async (userId, recipeId) => {
    const recipe = await getOneRecipe({ id: recipeId, owner: userId });

    if (!recipe) {
        return new AppError(errorTypes.NOT_FOUND);
    }

    await recipe.destroy();
    return true;
};

export default {
    listRecipes,
    getOneRecipe,
    deleteUserRecipe,
    findAllUserRecipes,
};
