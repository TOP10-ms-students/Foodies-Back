import db from "../db/index.js";

const findActualTestimonials = async () => {
    return await db.Testimonial.findAll({
        attributes: ["id", "testimonial"],
        include: [
            {
                model: db.User,
                as: "owner",
                attributes: ["id", "name"],
            }
        ],
        limit: 3,
        order: [["id", "desc"]],
    });
};

export default {
    findActualTestimonials,
};
