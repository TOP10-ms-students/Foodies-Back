import {AppError, errorTypes} from "../errors/appError.js";
import bcrypt from "bcrypt";
import db from "../db/models/index.cjs";
import jwt from "jsonwebtoken";

export class UsersService {
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

    async logIn(data) {
        const user = await db.Users.findOne({
            where: {
                email: data.email,
            },
        });
        if (!user) {
            throw new AppError(errorTypes.NOT_FOUND, "User not found");
        }
        const isValidPassword = await bcrypt.compare(data.password, user.password);
        if (!isValidPassword) {
            throw new AppError(errorTypes.INVALID_CRED, "Email or password is wrong");
        }

        user.token = jwt.sign({ id: user.id }, this.secret, { expiresIn: "24h" });
        return await user.save();
    }

    async getCurrentUser(userId) {
        const user = await db.Users.findOne({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new AppError(errorTypes.NOT_FOUND, "User not found");
        }
        return user;
    }

    async updateUser(user, data) {
        return await user.update(data);
    }
}

export const getUser = async (query) => {
    return db.Users.findOne({ where: query, rejectOnEmpty: true });
};
