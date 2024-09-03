import gravatar from "gravatar";
import * as usersServices from "../services/usersServices.js";
import ctrlWrapper from "../middleware/ctrlWrapper.js";
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
        if (error?.message === "Email in use") {
            return res.status(409).json({message: error.message});
        }
        next(error);
    }
};

export default {
    signup: ctrlWrapper(signup),
};
