import { DataTypes } from 'sequelize';

const FavoriteRecipe = (sequelize) => {
    const FavoriteRecipeModel = sequelize.define('FavoriteRecipe', {
        id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
    });

    return FavoriteRecipeModel;
}

export default FavoriteRecipe;
