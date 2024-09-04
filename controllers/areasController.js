import ctrlWrapper from "../middleware/ctrlWrapper.js";
import getAreas from "../services/areasServices.js";

async function getAllAreas(_, res) {
    const allCategories = await getAreas();
    res.json(allCategories);
}

const areasContr = {
    getAllCategories: ctrlWrapper(getAllAreas),
};

export default areasContr;
