import Joi from "joi";

export const createRecipeSchema = Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    area: Joi.string().required(),
    instructions: Joi.string().required(),
    description: Joi.string().required(),
    thumb: Joi.string().required(),
    time: Joi.number().required(),
});
