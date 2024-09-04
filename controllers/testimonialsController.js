import * as testimonialsService from "../services/testimonialsServices.js";

export const getAllTestimonials = async (req, res) => {
    const allTestimonials = await testimonialsService.getAllTestimonials();
    res.json(allTestimonials);
};
