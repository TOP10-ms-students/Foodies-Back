import {AppError, errorTypes} from "../errors/appError.js";
import db from "../db/index.js";
import { getAvatarPath, removeAvatarFile } from "../helpers/getAvatarPath.js";
import passwordManager from "../helpers/passwordManager.js";
import tokenManager from "../helpers/tokenManager.js";
import userRepository from "../repository/userRepository.js";

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

const updateUserAvatar = async (userId, oldPath, newFile) => {
    const avatarExtension = oldPath.split(".").pop();

    if (["jpg", "jpeg", "png", "gif"].includes(avatarExtension)) {
        await removeAvatarFile(oldPath);
    }

    const avatar = await getAvatarPath(newFile);
    const { avatar: newAvatarURL } = await updateUser(userId, { avatar });

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
    updateUserAvatar,
};

