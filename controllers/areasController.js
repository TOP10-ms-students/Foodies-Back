import ctrlWrapper from "../middleware/ctrlWrapper.js";
import getAreas from "../services/areasServices.js";

const getAllAreas = async (_, res) => {
    const areas = await getAreas();
    res.json({
        areas,
    });
}

const areasContr = {
    getAllAreas: ctrlWrapper(getAllAreas),
};

export default areasContr;
