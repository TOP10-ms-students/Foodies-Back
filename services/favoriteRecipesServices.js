import db from "../db/models/index.cjs";

function getFavorites(query) {
    const favoriteList = db.FavoriteRecipes.findAll({
        where: query,
    });

    return favoriteList;
}

const recipesServices = {
    getFavorites,
};

export default recipesServices;
