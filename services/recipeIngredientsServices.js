import db from "../db/models/index.cjs";

const postRecipeIngredients = ingredientsData => db.RecipeIngredients.bulkCreate(ingredientsData);

export default {
    postRecipeIngredients,
};
