import db from "../db/models/index.cjs";

async function getFollowers(userId) {
    return db.Followers.findAll({
        where: {
            userId,
        },
    });
}

async function getOneFollower(userId, followerId) {
    return db.Followers.findOne({
        where: {
            userId,
            followerId,
        },
    });
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
