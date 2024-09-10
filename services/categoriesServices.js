import db from "../db/models/index.cjs";

function getCategories() {
    return db.Categories.findAll();
}

export default {
    getCategories,
};
