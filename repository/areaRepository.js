import db from "../db/index.js";

const findAreas = () => db.Area.findAll();

export default {
    findAreas,
};
