import { ApiError } from "../errors/apiError.js";
import ctrlWrapper from "../middleware/ctrlWrapper.js";
import userServices from "../services/usersServices.js";

const getCurrentUser = async(req, res) => {
    const { name, email, avatar } = req.user;

    res.json({
        user: { name, email, avatar }
    });
}

const getUser = async(req, res) => {
    const { id } = req.params;

    const { name, email, avatar } = userServices.getUser({ id });

    res.json({
        user: { name, email, avatar }
    });
}

const getFollowers = async (req, res) => {
    const { id: userId } = req.params;
    const { page, limit } = req.query;

    const followers = await userServices.getFollowers(userId, page, limit);

    res.json({
        followers,
    });
}

const getFollowing = async (req, res) => {
    const { id: userId } = req.user;
    const following = await userServices.getFollowList(userId);

    res.json({
        following,
    });
}

const addNewFollower = async (req, res) => {
    const { followerId } = req.params;
    const { id: userId } = req.user;

    if (followerId === userId) {
        throw new ApiError(400);
    }

    const followerAdd = await userServices.addFollower(followerId, userId);
    if (!followerAdd) {
        throw new ApiError(409, "Ready in your list");
    }
    res.status(201).json({
        message: `Follower id: ${followerId} added`,
    });
}

const deleteFollower = async (req, res) => {
    const { followerId } = req.params;
    const { id: userId } = req.user;

    const delFollowerId = await userServices.removeFollower(followerId, userId);
    res.json({
        message: `Folower with id:${delFollowerId} removed successful`,
    });
}

const addAvatar = async (req, res) => {
    const { id, avatar: oldPath } = req.user;

    try {
        const avatar = await userServices.updateUserAvatar(id, oldPath, req.file);

        res.json({
            user: {
                avatar,
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const userContr = {
    getCurrentUser: ctrlWrapper(getCurrentUser),
    getUser: ctrlWrapper(getUser),
    getFollowers: ctrlWrapper(getFollowers),
    getFollowing: ctrlWrapper(getFollowing),
    addNewFollower: ctrlWrapper(addNewFollower),
    deleteFollower: ctrlWrapper(deleteFollower),
    addAvatar: ctrlWrapper(addAvatar),
};

export default userContr;
