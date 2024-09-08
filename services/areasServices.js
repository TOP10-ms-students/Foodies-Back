import db from "../db/models/index.cjs";

const getAreas = () => {
    return db.Areas.findAll();
}

export default {
    getAreas,
};
