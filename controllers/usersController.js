import { ApiError } from "../errors/apiError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import userServices from "../services/usersServices.js";
import userRepository from "../repository/userRepository.js";
import { normalizePaginationParams } from "../helpers/normalizePaginationParams.js";

const getCurrentUser = async(req, res) => {
    const { id, name, email, avatar } = req.user;

    const statistic = await userRepository.getUserStatistics(id, true);

    res.json({
        user: { name, email, avatar },
        statistic,
    });
}

const getUser = async(req, res) => {
    const { id } = req.params;

    const user = await userRepository.findUser({ id });

    if (!user) throw new ApiError(404, "User not found");

    const { name, email, avatar } = user;

    const statistic = await userRepository.getUserStatistics(id);

    res.json({
        user: { name, email, avatar },
        statistic,
    });
}

const getFollowers = async (req, res) => {
    const { id } = req.params;
    const { page, limit } = req.query;

    const followers = await userRepository.findFollowersData(id, normalizePaginationParams(page, limit), 'followers');
    const count = await userRepository.getFollowersCount(id);

    res.json({
        count,
        followers,
    });
}

const getFollowing = async (req, res) => {
    const { id } = req.user;
    const { page, limit } = req.query;
    console.log(id);

    const following = await userRepository.findFollowersData(id, normalizePaginationParams(page, limit));
    const count = await userRepository.getFollowingCount(id);

    res.json({
        count,
        following,
    });
}

const startFollow = async (req, res) => {
    const { id: userId } = req.params;
    const user = req.user;

    if (user.id === userId) {
        throw new ApiError(400, 'You can`t follow by yourself');
    }

    await userServices.startFollow(user, userId);

    res.json({
        message: 'Success',
    });
}

const stopFollow = async (req, res) => {
    const { id: userId } = req.params;
    const user = req.user;

    if (user.id === userId) {
        throw new ApiError(400, 'You can`t follow by yourself');
    }

    await userServices.stopFollow(user, userId);

    res.json({
        message: 'Success',
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

export default {
    getCurrentUser: ctrlWrapper(getCurrentUser),
    getUser: ctrlWrapper(getUser),
    getFollowers: ctrlWrapper(getFollowers),
    getFollowing: ctrlWrapper(getFollowing),
    startFollow: ctrlWrapper(startFollow),
    stopFollow: ctrlWrapper(stopFollow),
    addAvatar: ctrlWrapper(addAvatar),
};
