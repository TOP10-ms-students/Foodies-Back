import ctrlWrapper from "../middleware/ctrlWrapper.js";
import  areasServices from "../services/areasServices.js";

async function getAllAreas(_, res) {
    const areas = await areasServices.getAreas();
    res.json({ areas });
}

const areasContr = {
    getAllAreas: ctrlWrapper(getAllAreas),
};

export default areasContr;
