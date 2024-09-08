import ctrlWrapper from "../middleware/ctrlWrapper.js";
import getCategories from "../services/categoriesServices.js";

const getAllCategories = async (_, res) => {
    const categories = await getCategories();
    res.json({
        categories,
    });
}

const categoriesContr = {
    getAllCategories: ctrlWrapper(getAllCategories),
};

export default categoriesContr;
