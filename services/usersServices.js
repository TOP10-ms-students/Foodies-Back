import {AppError, errorTypes} from "../errors/appError.js";
import bcrypt from "bcrypt";
import db from "../db/models/index.cjs";

export class UsersServices {
    secret = process.env.JWT_SECRET;

    async signup(data) {
        const user = await db.Users.findOne({
            where: {
                email: data.email,
            },
        });
        if (user) {
            throw new AppError(errorTypes.ALREADY_EXIST, "Email in use");
        }

        const hashPassword = await bcrypt.hash(data.password, 10);
        const newUser = await db.Users.create({
            ...data,
            password: hashPassword,
        });
        return newUser;
    }
}
