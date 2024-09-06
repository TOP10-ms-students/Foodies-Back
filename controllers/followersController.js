import ctrlWrapper from "../middleware/ctrlWrapper.js";
import followServices from "../services/followersServices.js";

async function addNewFollower(req, res) {
    const { id: followerId } = req.params;
    const { id: userId } = req.user;

    await followServices.addFollower({ followerId, userId });
    res.status(201).json({
        message: `Follower id: ${followerId} added`,
    });
}

async function deleteFollower(req, res) {
    const { id: followerId } = req.params;
    console.log(followerId);
    const { id: userId } = req.user;
    console.log(userId);

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
