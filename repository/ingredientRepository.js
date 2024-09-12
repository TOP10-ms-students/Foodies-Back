import db from "../db/index.js";
import { Op } from "sequelize";

const findIngredients = async (name, { limit, offset }) => {
    const whereCondition = name
        ? { name: { [Op.iLike]: `%${name}%` } }
        : {};

    return await db.Ingredient.findAndCountAll({
        where: whereCondition,
        attributes: ['id', 'name'],
        distinct:true,
        limit,
        offset,
    });
};

export default {
    findIngredients,
};
