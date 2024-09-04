import db from "../db/models/index.cjs";

function getAreas() {
    return db.Areas.findAll();
}

export default getAreas;
