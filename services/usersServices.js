import {AppError, errorTypes} from "../errors/appError.js";
import db from "../db/index.js";
import passwordManager from "../helpers/passwordManager.js";
import tokenManager from "../helpers/tokenManager.js";
import userRepository from "../repository/userRepository.js";
import cloudinaryStorage from "../helpers/cloudinaryStorage.js";
import { USER_CLOUDINARY_STORAGE_DIR } from "../constants/userConstants.js";

const createUser = async (data) => {
    const {name, email, password: plainPassword} = data;

    const password = passwordManager.hashPassword(plainPassword);

    return await db.User.create({
        name,
        email,
        emailCanonical: email.toLowerCase(),
        password,
    });
};

const logIn = async (data) => {
    const { email, password } = data;

    const user = await userRepository.findUser({ email });

    if (!user || !passwordManager.isPasswordValid(password, user?.password))
        throw new AppError(errorTypes.INVALID_CRED, "Email or password is wrong");

    const token = tokenManager.generate({ id: user.id });

    await user.update({ token });

    return user;
}

export const updateUser = async (user, data) => user.update(data);

const updateAvatar = async (user, file) => {
    const avatar = await cloudinaryStorage.upload(file, USER_CLOUDINARY_STORAGE_DIR);

    const { avatar: newAvatarURL } = await updateUser(user, { avatar });

    return newAvatarURL;
}

const startFollow = async (follower, id) => {
    const user = await userRepository.findUser({ id });

    if (!user) throw new AppError(errorTypes.NOT_FOUND, "User not exist");

    const isAlreadyFollow = await user.hasFollower(follower);

    if (isAlreadyFollow) throw new AppError(errorTypes.ALREADY_EXIST, "You already follow by this user");

    await user.addFollower(follower);
}

const stopFollow = async (follower, id) => {
    const user = await userRepository.findUser({ id });

    if (!user) throw new AppError(errorTypes.NOT_FOUND, "User not exist");

    const isAlreadyFollow = await user.hasFollower(follower);

    if (!isAlreadyFollow) throw new AppError(errorTypes.ALREADY_EXIST, "You don`t follow by this user");

    await user.removeFollower(follower);
}

export default {
    createUser,
    logIn,
    updateUser,
    startFollow,
    stopFollow,
    updateAvatar,
};

