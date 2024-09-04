import ctrlWrapper from "../middleware/ctrlWrapper.js";
import getCategories from "../services/categoriesServices.js";

async function getAllCategories(_, res) {
    const allCategories = await getCategories();

    res.json(allCategories);
}

const categoriesContr = {
    getAllCategories: ctrlWrapper(getAllCategories),
};

export default categoriesContr;
