import db from "../db/models/index.cjs";

function getFavorites(id) {
    const favoriteList = db.FavoriteRecipes.findAll({
        where: id,
    });

    return favoriteList;
}

const recipesServices = {
    getFavorites,
};

export default recipesServices;