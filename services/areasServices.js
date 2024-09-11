import db from "../db/index.js";

function getAreas() {
    return db.Areas.findAll();
}

export default {
    getAreas,
};
