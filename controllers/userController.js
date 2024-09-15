import { ApiError } from "../errors/apiError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import userServices from "../services/usersServices.js";
import userRepository from "../repository/userRepository.js";
import { normalizePaginationParams } from "../helpers/normalizePaginationParams.js";

const getCurrentUser = async (req, res) => {
    const { id, name, email, avatar } = req.user;

    const statistic = await userRepository.getUserStatistics(id, true);

    res.json({
        user: {
            id,
            name,
            email,
            avatar,
            statistic,
        },
    });
};

const getUser = async (req, res) => {
    const { id } = req.params;
    const currentUser = req.user;

    const user = await userRepository.findUser({ id });

    if (!user) throw new ApiError(404, "User not found");

    const { name, email, avatar } = user;

    const [statistic, isFollowing] = await Promise.all([
        userRepository.getUserStatistics(id),
        userRepository.checkIsFollowing(currentUser.id, id),
    ]);

    res.json({
        user: {
            id,
            name,
            email,
            avatar,
            statistic,
            isFollowing,
        },
    });
};

const getFollowers = async (req, res) => {
    const { id } = req.params;
    const { page, limit } = req.query;

    const followers = await userRepository.findFollowersData(id, normalizePaginationParams(page, limit), "followers");
    const count = await userRepository.getFollowersCount(id);

    res.json({
        count,
        followers,
    });
};

const getFollowing = async (req, res) => {
    const { id } = req.user;
    const { page, limit } = req.query;

    const following = await userRepository.findFollowersData(id, normalizePaginationParams(page, limit));
    const count = await userRepository.getFollowingCount(id);

    res.json({
        count,
        following,
    });
};

const startFollow = async (req, res) => {
    const { id: userId } = req.params;
    const user = req.user;

    if (user.id === userId) {
        throw new ApiError(400, "You can`t follow by yourself");
    }

    await userServices.startFollow(user, userId);

    res.json({
        message: "Success",
    });
};

const stopFollow = async (req, res) => {
    const { id: userId } = req.params;
    const user = req.user;

    if (user.id === userId) {
        throw new ApiError(400, "You can`t follow by yourself");
    }

    await userServices.stopFollow(user, userId);

    res.json({
        message: "Success",
    });
};

const updateAvatar = async (req, res) => {
    const file = req.file;

    if (!file) throw new ApiError(400, "Avatar is required");

    const avatar = await userServices.updateAvatar(req.user, file);

    res.json({
        user: {
            avatar,
        },
    });
};

export default {
    getCurrentUser: ctrlWrapper(getCurrentUser),
    getUser: ctrlWrapper(getUser),
    getFollowers: ctrlWrapper(getFollowers),
    getFollowing: ctrlWrapper(getFollowing),
    startFollow: ctrlWrapper(startFollow),
    stopFollow: ctrlWrapper(stopFollow),
    updateAvatar: ctrlWrapper(updateAvatar),
};
