import ctrlWrapper from "../middleware/ctrlWrapper.js";
import categoriesServ from "../services/categoriesServices.js";

const getAllCategories = async (_, res) => {
    const categories = await categoriesServ.getCategories();
    res.json({
        categories,
    });
}

const categoriesContr = {
    getAllCategories: ctrlWrapper(getAllCategories),
};

export default categoriesContr;
