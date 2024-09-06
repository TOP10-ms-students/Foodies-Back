import {UsersService} from "../services/usersServices.js";
import ctrlWrapper from "../middleware/ctrlWrapper.js";
import { getAvatarPath, removeAvatarFile } from "../helpers/getAvatarPath.js";

const service = new UsersService();

async function addAvatar(req, res) {
    const { id, avatar: oldPath } = req.user;

    const avatarExtention = oldPath.split(".").pop();

    if (avatarExtention === "jpg") {
        try {
            await removeAvatarFile(oldPath);
        } catch (error) {
            console.log(error.message);
        }
    }

    const avatar = await getAvatarPath(req.file);
    const { avatar: newAvatarURL } = await service.updateUser(id , { avatar });

    res.json({
        user: {
            avatar: newAvatarURL,
        },
    });
}

export default {
    addAvatar: ctrlWrapper(addAvatar),
};
