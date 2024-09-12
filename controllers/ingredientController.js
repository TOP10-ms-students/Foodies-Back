import ctrlWrapper from "../helpers/ctrlWrapper.js";
import ingredientsRepository from "../repository/ingredientRepository.js";
import { normalizePaginationParams } from "../helpers/normalizePaginationParams.js";

const getIngredientList = async (req, res) => {
    const { name, page, limit } = req.query;

    const { count, rows: ingredients } = await ingredientsRepository.findIngredients(name, normalizePaginationParams(page, limit));

    res.json({ count, ingredients });
};

export default {
    getIngredientList: ctrlWrapper(getIngredientList),
};
