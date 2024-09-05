"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class FavoriteRecipes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    }
    FavoriteRecipes.init(
        {
            recipeId: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
        },
        {
            sequelize,
            timestamps: false,
            modelName: "FavoriteRecipes",
        }
    );
    return FavoriteRecipes;
};
