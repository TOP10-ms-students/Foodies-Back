import db from "../db/models/index.cjs";

export const addFavorietsRecipes = async data => await db.Favorite.create(data);
