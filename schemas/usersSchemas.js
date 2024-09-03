import Joi from "joi";
import { emailRegExp } from "../constants/constants.js";

export const signupSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(5).required(),
  avatarURL: Joi.string().optional(),
});
