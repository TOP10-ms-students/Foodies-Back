import Joi from "joi";

export const signupSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(5).required(),
    avatar: Joi.string().optional(),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
