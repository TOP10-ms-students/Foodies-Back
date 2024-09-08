import { ApiError } from "../errors/apiError.js";
import ctrlWrapper from "../middleware/ctrlWrapper.js";
import followServices from "../services/followersServices.js";

const getFollowers = async (req, res) => {
    const { id: userId } = req.user;

    const followers = await followServices.getFollowers(userId);

    res.json({
        followers: followers || [],
    });
}

const getFollows = async (req, res) => {
    const { id: userId } = req.user;

    const follower = await followServices.getFollowList(userId);

    res.json({
        follower,
    });
}

async function addNewFollower(req, res) {
    const { followerId } = req.params;
    const { id: userId } = req.user;

    if (followerId === userId) {
        throw new ApiError(400);
    }

    const followerAdd = await followServices.addFollower(followerId, userId);
    if (!followerAdd) {
        throw new ApiError(409, "Ready in your list");
    }
    res.status(201).json({
        message: `Follower id: ${followerId} added`,
    });
}

async function deleteFollower(req, res) {
    const { followerId } = req.params;
    const { id: userId } = req.user;

    const delFollowerId = await followServices.removeFollower(followerId, userId);
    res.json({
        message: `Folower with id:${delFollowerId} removed successful`,
    });
}

const followersContr = {
    getFollowers: ctrlWrapper(getFollowers),
    getFollows: ctrlWrapper(getFollows),
    addNewFollower: ctrlWrapper(addNewFollower),
    deleteFollower: ctrlWrapper(deleteFollower),
};

export default followersContr;
