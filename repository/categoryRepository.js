import db from "../db/index.js";

const findCategories = async () => db.Category.findAll();

export default {
    findCategories,
};
