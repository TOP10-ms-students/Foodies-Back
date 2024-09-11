import db from "../db/index.js";

export const getAllTestimonials = async () => {
    return await db.Testimonials.findAll();
};
