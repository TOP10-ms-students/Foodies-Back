import ctrlWrapper from "../helpers/ctrlWrapper.js";
import userServices from "../services/usersServices.js";
import { UniqueConstraintError } from "sequelize";
import { ApiError } from "../errors/apiError.js";

const signUp = async (req, res) => {
    try {
        const newUser = await userServices.createUser(req.body);

        res.status(201).json({
            user: {
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        if (error instanceof UniqueConstraintError) throw new ApiError(409, 'Email in use');
    }
}

const signIn = async (req, res) => {
    const { id, name, email, avatar, token } = await userServices.logIn(req.body);

    res.json({
        user: { id, name, email, avatar },
        token,
    });
}

const logOut = async (req, res) => {
    await userServices.updateUser(req.user, { token: null });

    res.status(204).send();
}

export default {
    signUp: ctrlWrapper(signUp),
    signIn: ctrlWrapper(signIn),
    logOut: ctrlWrapper(logOut),
};
