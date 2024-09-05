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

export default {
    listRecipes,
    getOneRecipe,
};
