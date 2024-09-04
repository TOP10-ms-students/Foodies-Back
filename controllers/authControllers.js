import gravatar from "gravatar";
import ctrlWrapper from "../middleware/ctrlWrapper.js";
import {UsersServices} from "../services/usersServices.js";

const service = new UsersServices();

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

export default {
    signup: ctrlWrapper(signup),
};
