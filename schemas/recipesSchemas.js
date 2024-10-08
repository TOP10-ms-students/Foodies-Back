import Joi from "joi";

export const createRecipeSchema = Joi.object({
    title: Joi.string().required(),
    categoryId: Joi.string().required(),
    areaId: Joi.string().required(),
    instructions: Joi.string().required(),
    description: Joi.string().required(),
    time: Joi.number().required(),
    ingredients: Joi.array()
        .items(
            Joi.object().keys({
                ingredientId: Joi.string().required(),
                measure: Joi.string().required(),
            })
        )
        .min(1)
        .required(),
});
