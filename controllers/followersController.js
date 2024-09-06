import { ApiError } from "../errors/apiError.js";
import ctrlWrapper from "../middleware/ctrlWrapper.js";
import followServices from "../services/followersServices.js";

async function getFollowers(req, res) {
    const { id: userId } = req.params;

    const followers = await followServices.getFollowers(userId);
    if (!followers) {
        return res.status(404).json({
            message: "No followers found",
        });
    }

    res.json({
        followers,
    });
}

async function getOneFollower(req, res) {
    const { id: userId } = req.params;
    const { followerId } = req.params;

    const follower = await followServices.getOneFollower(userId, followerId);
    if (!follower) {
        return res.status(404).json({
            message: `Follower with id: ${followerId} not found`,
        });
    }

    res.json({
        follower,
    });
}

async function addNewFollower(req, res) {
    const { id: followerId } = req.params;
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
    const { id: followerId } = req.params;
    const { id: userId } = req.user;

    const delFollowerId = await followServices.removeFollower(followerId, userId);
    res.json({
        message: `Folower with id:${delFollowerId} removed successful`,
    });
}

const followersContr = {
    getFollowers: ctrlWrapper(getFollowers),
    getOneFollower: ctrlWrapper(getOneFollower),
    addNewFollower: ctrlWrapper(addNewFollower),
    deleteFollower: ctrlWrapper(deleteFollower),
};

export default followersContr;
