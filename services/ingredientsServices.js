import db from "../db/index.js";

export const getIngredients = async () => {
    return await db.Ingredients.findAll();
};
