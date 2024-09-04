import db from "../db/models/index.cjs";

export const getAllTestimonials = async () => {
    return await db.Testimonials.findAll();
};
