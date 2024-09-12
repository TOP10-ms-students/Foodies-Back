import Joi from "joi";
import { emailRegex, passwordRegex } from "../constants/userConstants.js";

export const signUpSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().pattern(emailRegex).required().messages({
        'string.pattern.base': 'Invalid email format.',
        'string.empty': 'Email is required.',
        'any.required': 'Email is required.',
    }),
    password: Joi.string().pattern(passwordRegex).required().messages({
        'string.pattern.base': 'Password must be at least 8 characters long and include both letters and numbers.',
        'string.empty': 'Password is required.',
        'any.required': 'Password is required.',
    })
});

export const signInSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required().messages({
        'string.pattern.base': 'Invalid email format.',
        'string.empty': 'Email is required.',
        'any.required': 'Email is required.',
    }),
    password: Joi.string().pattern(passwordRegex).required().messages({
        'string.pattern.base': 'Password must be at least 8 characters long and include both letters and numbers.',
        'string.empty': 'Password is required.',
        'any.required': 'Password is required.',
    })
});
