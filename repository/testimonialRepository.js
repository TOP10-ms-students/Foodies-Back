import db from "../db/index.js";

const findActualTestimonials = async () => {
    return await db.Testimonial.findAll({
        limit: 5,
        order: ['id', 'desc'],
    });
};

export default {
    findActualTestimonials,
};
