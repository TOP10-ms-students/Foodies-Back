import ctrlWrapper from "../helpers/ctrlWrapper.js";
import * as ingredientsServices from "../services/ingredientsServices.js";

const getAllIngredients = async (req, res) => {
    const result = await ingredientsServices.getIngredients();
    res.json(result);
};

export default {
    getAllIngredients: ctrlWrapper(getAllIngredients),
};
