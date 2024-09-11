import {UsersService} from "../services/usersServices.js";
import ctrlWrapper from "../middleware/ctrlWrapper.js";

const service = new UsersService();

async function addAvatar(req, res) {
    const { id, avatar: oldPath } = req.user;

    try {
        const avatar = await service.updateUserAvatar(id, oldPath, req.file);
        
        res.json({
            user: {
                avatar,
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default {
    addAvatar: ctrlWrapper(addAvatar),
};
