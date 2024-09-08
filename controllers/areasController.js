import ctrlWrapper from "../middleware/ctrlWrapper.js";
import areasServ from "../services/areasServices.js";

const getAllAreas = async (_, res) => {
    const areas = await areasServ.getAreas();
    res.json({
        areas,
    });
}

const areasContr = {
    getAllAreas: ctrlWrapper(getAllAreas),
};

export default areasContr;
