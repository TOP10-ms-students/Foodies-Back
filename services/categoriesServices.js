import db from "../db/index.js";

function getCategories() {
    return db.Categories.findAll();
}

export default {
    getCategories,
};
