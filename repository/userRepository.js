import db, { sequelize } from "../db/index.js";
import { QueryTypes, Sequelize } from "sequelize";

const getUser = async (query) => {
    return db.User.findOne({ where: query, rejectOnEmpty: true });
};

const findUser = async query => db.User.findOne({ where: query });

const getUserStatistics = async (id, personal = false) => {
    const createdRecipeCount = await db.Recipe.count({
        where: { ownerId: id }
    });

    const followersCount = await db.Follower.count({
        where: { userId: id }
    });

    if (!personal) return {
        createdRecipeCount,
        followersCount,
    };

    const favoriteRecipeCount = await db.FavoriteRecipe.count({
        where: { userId: id }
    });

    const followingCount = await db.Follower.count({
        where: { followerId: id }
    });

    return {
        createdRecipeCount,
        favoriteRecipeCount,
        followingCount,
        followersCount,
    };
};

const findFollowersData = async (userId, { limit, offset }, type = 'following') => {
    const dynamicFields = type === 'following'
        ? {
            followerTable: 'follower_id',
            joinUserTable: 'user_id',
        }
        : {
            followerTable: 'user_id',
            joinUserTable: 'follower_id',
        };

    const query = `
        SELECT
            u.id,
            u.name,
            u.avatar,
            COUNT(r.id) AS recipeCount,
            (
                SELECT JSON_AGG(json_build_object('id', r2.id, 'thumb', r2.thumb))
                FROM (
                    SELECT
                        r2.id,
                        r2.thumb
                    FROM
                        recipes AS r2
                    WHERE
                        r2.owner_id = u.id
                    ORDER BY
                        r2.created_at DESC
                    LIMIT 4
                ) AS r2
            ) AS recipes
        FROM
            followers AS f
            INNER JOIN users AS u ON f.${dynamicFields.joinUserTable} = u.id
            LEFT JOIN recipes AS r ON r.owner_id = u.id
        WHERE
            f.${dynamicFields.followerTable} = :userId
        GROUP BY
            u.id
        LIMIT :limit OFFSET :offset;
    `;

    const replacements = {
        userId,
        limit,
        offset,
    };

    return await sequelize.query(query, {
        replacements,
        type: QueryTypes.SELECT,
    });
};


export default {
    getUser,
    findUser,
    getUserStatistics,
    findFollowersData,
};
