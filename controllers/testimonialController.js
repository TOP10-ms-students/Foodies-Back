import ctrlWrapper from "../helpers/ctrlWrapper.js";
import testimonialRepository from "../repository/testimonialRepository.js";

const getTestimonialList = async (req, res) => {
    const testimonials = await testimonialRepository.findActualTestimonials();

    res.json({ testimonials });
};

export default {
    getTestimonialList: ctrlWrapper(getTestimonialList),
};