import db from "../db/index.js";

const findCategories = () => db.Category.findAll();

export default {
    findCategories,
};
