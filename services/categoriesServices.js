import db from "../db/models/index.cjs";

const getCategories = () => {
    return db.Categories.findAll();
}

export default {
    getCategories,
};
