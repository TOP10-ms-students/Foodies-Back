import db from "../db/index.js";

const findActualTestimonials = async () => {
    return await db.Testimonial.findAll({
        attributes: ["id", "testimonial", "createdAt"],
        include: [
            {
                model: db.User,
                as: "owner",
                attributes: ["id", "name"],
            }
        ],
        limit: 3,
        order: [["createdAt", "desc"]],
    });
};

export default {
    findActualTestimonials,
};
