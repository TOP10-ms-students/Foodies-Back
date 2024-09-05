import db from "../db/models/index.cjs"

function addFollower(query) {

    return db.Followers.create(query);
};

async function removeFollower(query) {

    const remFollower = await db.User.findOne({
        where: query
    });

    if (!remFollower) {
        return null;
    };

    db.Followers.destroy({
        where: query
    });

    return remFollower.id;
};

const followServices = {
    addFollower,
    removeFollower,
};

export default followServices;