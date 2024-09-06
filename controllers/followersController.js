import { ApiError } from "../errors/apiError.js";
import ctrlWrapper from "../middleware/ctrlWrapper.js";
import followServices from "../services/followersServices.js";

async function addNewFollower(req, res, next) {
    const { id: followerId } = req.params;
    const { id: userId } = req.user;

    if (followerId === userId) {
        return next(new ApiError(400));
    }

    const followerAdd = await followServices.addFollower({ followerId, userId });
    if (!followerAdd) {
        return next(new ApiError(409, "Ready in your list"));
    }
    res.status(201).json({
        message: `Follower id: ${followerId} added`,
    });
}

async function deleteFollower(req, res) {
    const { id: followerId } = req.params;
    const { id: userId } = req.user;

    const delFollowerId = await followServices.removeFollower({ followerId, userId });
    res.json({
        message: `Folower with id:${delFollowerId} removed successful`,
    });
}

const followersContr = {
    addNewFollower: ctrlWrapper(addNewFollower),
    deleteFollower: ctrlWrapper(deleteFollower),
};

export default followersContr;
