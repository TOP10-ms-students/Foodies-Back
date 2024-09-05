import ctrlWrapper from "../middleware/ctrlWrapper";
import usersServices from "../services/usersServices";
const { getAvatarPath, removeAvatarFile } = require("../helpers/getAvatarPath");

const addAvatar = async (req, res) => {
    const { id, avatar: oldPath } = req.user;
    const avatarExtention = oldPath.split(".").pop();

    if (avatarExtention === "jpg") {
        try {
            await removeAvatarFile(oldPath);
        } catch (error) {
            console.log(error.message);
        }
    }

    const avatarURL = await getAvatarPath(req.file);

    const { avatarURL: newAvatarURL } = await usersServices.updateUser({ id }, { avatarURL });

    res.json({
        user: {
            avatarURL: newAvatarURL,
        },
    });
};

export default {
    addAvatar: ctrlWrapper(addAvatar),
};
