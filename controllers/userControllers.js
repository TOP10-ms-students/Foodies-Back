import { ApiError } from "../errors/apiError.js";
import ctrlWrapper from "../middleware/ctrlWrapper.js";
import userServices from "../services/usersServices.js";

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

const userContr = {
    getFollowers: ctrlWrapper(getFollowers),
    getFollowing: ctrlWrapper(getFollowing),
    addNewFollower: ctrlWrapper(addNewFollower),
    deleteFollower: ctrlWrapper(deleteFollower),
};

export default userContr;
