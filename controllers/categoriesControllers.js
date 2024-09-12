import ctrlWrapper from "../helpers/ctrlWrapper.js";
import categoryRepository from "../repository/categoryRepository.js";

async function categoryList(_, res) {
    const categories = await categoryRepository.findCategories();

    res.json({
        categories,
    });
}

export default {
    categoryList: ctrlWrapper(categoryList),
};
