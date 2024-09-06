import db from "../db/models/index.cjs";

async function addFollower(query) {
    const follow = await db.Followers.findOne({
        where: query,
    });
    
    if (follow) {
        return null
    };

    return db.Followers.create(query);
};

async function removeFollower(query) {
    const remFollower = await db.Users.findOne({
        where: {
            id: query.followerId,
        },
    });

    if (!remFollower) {
        return null;
    }

    db.Followers.destroy({
        where: query,
    });

    return remFollower.id;
}

const followServices = {
    addFollower,
    removeFollower,
};

export default followServices;
