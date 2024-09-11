import gravatar from "gravatar";
import ctrlWrapper from "../middleware/ctrlWrapper.js";
import userServices from "../services/usersServices.js";


const signUp = async (req, res) => {
    const {...userData} = req.body;
    const gravatarUrl = gravatar.url(userData.email, {s: "250"}, true);
    const newUser = await userServices.signUp({ ...userData, avatar: gravatarUrl, });
    res.status(201).json({
        user: {
            name: newUser.name,
            email: newUser.email,
        },
    });
}

const signIn = async (req, res) => {
    const user = await userServices.logIn(req.body);
    res.json({
        user: {
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        },
        token: user.token,
    });
}

const logOut = async (req, res) => {
    const {id} = req.user;
    await userServices.updateUser(id, { token: null });
    res.status(204).send();
}

export default {
    signUp: ctrlWrapper(signUp),
    signIn: ctrlWrapper(signIn),
    logOut: ctrlWrapper(logOut),
};
