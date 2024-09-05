import db from "../db/models/index.cjs";

export const getIngredients = async () => {
    return await db.Ingredients.findAll();
};
