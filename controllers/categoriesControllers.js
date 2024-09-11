import ctrlWrapper from "../middleware/ctrlWrapper.js";
import categoriesServices from "../services/categoriesServices.js";

async function getAllCategories(_, res) {
    const allCategories = await categoriesServices.getCategories();
    res.json({
        categories: allCategories,
    });
}

const categoriesContr = {
    getAllCategories: ctrlWrapper(getAllCategories),
};

export default categoriesContr;
