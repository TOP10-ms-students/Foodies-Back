import gravatar from "gravatar";
import * as usersServices from "../services/usersServices.js";
import ctrlWrapper from "../middleware/ctrlWrapper.js";
import {AppError, errorTypes} from "../errors/appError.js";
import "dotenv/config";

const signup = async (req, res, next) => {
    try {
        const {...userData} = req.body;
        const gravatarUrl = gravatar.url(userData.email, {s: "250"}, true);
        const newUser = await usersServices.signup({...userData, avatarURL: gravatarUrl,});

        res.status(201).json({
            user: {
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        if (errorTypes.ALREADY_EXIST) {
            throw new AppError(errorTypes.ALREADY_EXIST, error.message);
        }
        next(error);
    }
};

export default {
    signup: ctrlWrapper(signup),
};
