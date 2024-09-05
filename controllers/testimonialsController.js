import ctrlWrapper from "../middleware/ctrlWrapper.js";
import * as testimonialsService from "../services/testimonialsServices.js";

const getAllTestimonials = async (req, res) => {
    const allTestimonials = await testimonialsService.getAllTestimonials();
    res.json(allTestimonials);
};

export default {
    getAllTestimonials: ctrlWrapper(getAllTestimonials),
};
