import {AppError, errorTypes} from "../errors/appError.js";
import bcrypt from "bcrypt";
import db from "../db/models/index.cjs";
import jwt from "jsonwebtoken";
import { ApiError } from "../errors/apiError.js";

const secret = process.env.JWT_SECRET;

const signUp = async (data) => {
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
};

const logIn = async (data) => {
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

    user.token = jwt.sign({ id: user.id }, secret, { expiresIn: "24h" });
        return await user.save();
    }
const getCurrentUser = async (userId) => {
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

const updateUser = async (query, data) => {
        const user = await getCurrentUser(query);
        return user.update(data);
    }


const getUser = async (query) => {
    return db.Users.findOne({ where: query, rejectOnEmpty: true });
};

async function getFollowers(userId, page = 1, limit = 4) {
    const normLimit = Number(limit);
    const normOffset = (Number(page) - 1) * normLimit;

    return db.Followers.findAll({
        where: {
            userId,
        },
        limit: normLimit,
        offset: normOffset,
    });
}

const getFollowList = (userId) => {
    const follows = db.Followers.findAll({
        where: { followerId: userId },
        attributes: ['userId'],
    });
    return follows;
};

async function addFollower(followerId, userId) {
    const query = { followerId, userId };
    const follow = await db.Followers.findOne({
        where: query,
    });

    if (follow) {
        return null;
    }

    return db.Followers.create(query);
}

async function removeFollower(followerId, userId) {
    const query = { followerId, userId };
    const remFollower = await db.Users.findOne({
        where: {
            id: query.followerId,
        },
    });

    if (!remFollower) {
        return null;
    }

    await db.Followers.destroy({
        where: query,
    });

    return remFollower.id;
}

const userServices = {
    signUp,
    logIn,
    getCurrentUser,
    updateUser,
    addFollower,
    removeFollower,
    getFollowers,
    getFollowList,
    getUser,
};

export default userServices;

