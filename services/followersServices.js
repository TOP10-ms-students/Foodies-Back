import db from "../db/models/index.cjs";
import { ApiError } from "../errors/apiError.js";

async function getFollowers(userId) {
    return db.Followers.findAll({
        where: {
            userId,
        },
    });
}

async function getOneFollower(userId, followerId) {
    const follower = await db.Followers.findOne({
        where: {
            userId,
            followerId,
        },
    });

    if (!follower) {
        throw new ApiError(404, `Follower with id: ${followerId} not found`);
    }

    return follower;
}

async function addFollower(followerId, userId) {
    const query = { followerId, userId };
    const follow = await db.Followers.findOne({
        where: query,
    });

    if (follow) {
        return null;
    }

    return db.Followers.create(query);
}

async function removeFollower(followerId, userId) {
    const query = {followerId, userId};
    const remFollower = await db.Users.findOne({
        where: {
            id: query.followerId,
        },
    });

    if (!remFollower) {
        return null;
    }

    await db.Followers.destroy({
        where: query,
    });

    return remFollower.id;
}

const followServices = {
    addFollower,
    removeFollower,
    getFollowers,
    getOneFollower,
};

export default followServices;
