import gravatar from "gravatar";
import ctrlWrapper from "../middleware/ctrlWrapper.js";
import {UsersService} from "../services/usersServices.js";

const service = new UsersService();

async function signup(req, res) {
    const {...userData} = req.body;
    const gravatarUrl = gravatar.url(userData.email, {s: "250"}, true);
    const newUser = await service.signup({...userData, avatar: gravatarUrl,});
    res.status(201).json({
        user: {
            name: newUser.name,
            email: newUser.email,
        },
    });
}

async function logIn(req, res) {
    const user = await service.logIn(req.body);
    res.json({
        user: {
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        },
        token: user.token,
    });
}

export default {
    signup: ctrlWrapper(signup),
    logIn: ctrlWrapper(logIn),
};
