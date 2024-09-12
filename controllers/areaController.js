import ctrlWrapper from "../helpers/ctrlWrapper.js";
import areaRepository from "../repository/areaRepository.js";

const areaList = async (_, res) => {
    const areas = await areaRepository.findAreas();
    res.json({ areas });
}

export default {
    areaList: ctrlWrapper(areaList),
};
