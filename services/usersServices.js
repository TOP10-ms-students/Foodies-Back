import db from "../db/models/index.cjs";
import bcrypt from "bcrypt";
import {AppError, errorTypes} from "../errors/appError.js";

export const findUser = (query) => db.Users.findOne(query);
export const signup = async (data) => {
    try {
        const {email, password} = data;

        const existingUser = await findUser({where: {email}});
        if (existingUser) {
            throw new AppError(errorTypes.ALREADY_EXIST, "Email in use");
        }

        const hashPassword = await bcrypt.hash(password, 10);
        return await db.Users.create({...data, password: hashPassword});
    } catch (error) {
        if (error?.parent?.code === "23505") {
            error.message = "Email in use";
        }
        throw error;
    }
};
