const { default: ctrlWrapper } = require("../middleware/ctrlWrapper.js");
const { default: followServices } = require("../services/followersServices.js");

async function addNewFollower(req, res) {

    const { id: followerId } = req.params;
    const { id: userId } = req.user;

    await followServices.addFollower({ followerId, userId });
    res.status(201).json({
        message: `Follower id: ${followerId} added`
    });

};

async function deleteFollower(req, res) {
    const { id: followerId } = req.params;
    const { id: userId } = req.user;

    const delFollowerId = await followServices.removeFollower({ followerId, userId });
    res.json({
        message: `Folower with id:${delFollowerId} removed successful`
    });
};


const followersContr = {
    addNewFollower: ctrlWrapper(addNewFollower),
    deleteFollower: ctrlWrapper(deleteFollower),
};

export default followersContr;