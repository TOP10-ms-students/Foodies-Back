import {AppError, errorTypes} from "../errors/appError.js";
import bcrypt from "bcrypt";
import db from "../db/index.js";
import jwt from "jsonwebtoken";
import { getAvatarPath, removeAvatarFile } from "../helpers/getAvatarPath.js";


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

const updateUser = async (query, data) => {
    const user = await getCurrentUser(query);
    return user.update(data, {
        returning: true,
    });
}

const getUser = async (query) => {
    return db.Users.findOne({ where: query, rejectOnEmpty: true });
};

const updateUserAvatar = async (userId, oldPath, newFile) => {
    const avatarExtension = oldPath.split(".").pop();

    if (["jpg", "jpeg", "png", "gif"].includes(avatarExtension)) {
        await removeAvatarFile(oldPath);
    }

    const avatar = await getAvatarPath(newFile);
    const { avatar: newAvatarURL } = await updateUser(userId, { avatar });

    return newAvatarURL;
}

const getFollowers = async (userId, page = 1, limit = 4) => {
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

const addFollower = async (followerId, userId) => {
    const query = { followerId, userId };
    const follow = await db.Followers.findOne({
        where: query,
    });

    if (follow) {
        return null;
    }

    return db.Followers.create(query);
}

const removeFollower = async (followerId, userId) => {
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
    updateUserAvatar,
};

export default userServices;

