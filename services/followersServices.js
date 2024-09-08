import db from "../db/models/index.cjs";

const getFollowers = (userId) => {
    return db.Followers.findAll({
        where: {
            userId,
        },
    });
};

const getFollowList = (userId) => {
    const follows = db.Followers.findAll({
        where: { followerId: userId },
        attributes: ['userId'],
    });
    return follows;
};

const addFollower = async (followerId, userId) => {
    const query = { followerId, userId };
    const follow = await db.Followers.findOne({
        where: query,
    });

    if (follow) {
        return null;
    };

    return db.Followers.create(query);
};

const removeFollower = async (followerId, userId) => {
    const query = { followerId, userId };
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
};

const followServices = {
    addFollower,
    removeFollower,
    getFollowers,
    getFollowList,
};

export default followServices;
