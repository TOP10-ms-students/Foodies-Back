import ctrlWrapper from "../middleware/ctrlWrapper.js";
import * as testimonialsService from "../services/testimonialsServices.js";

const getAllTestimonials = async (req, res) => {
    const allTestimonials = await testimonialsService.getAllTestimonials();
    res.json(allTestimonials);
};

const testimonialsContr = {
    getAllTestimonials: ctrlWrapper(getAllTestimonials),
};

export default testimonialsContr;
