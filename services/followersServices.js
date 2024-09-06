import db from "../db/models/index.cjs";

function addFollower(query) {
    return db.Followers.create(query);
}

async function removeFollower(query) {
    console.log(query.userId);
    const remFollower = await db.Users.findOne({
        where: {
            id: query.userId,
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
