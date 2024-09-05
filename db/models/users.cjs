"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            models.Users.belongsToMany(models.Users, {
                through: "Followers",
                as: "followers",
                foreignKey: "followerId",
                otherKey: "userId",
            });

            models.Users.belongsToMany(models.Users, {
                through: "Followers",
                as: "followedBy",
                foreignKey: "userId",
                otherKey: "followerId",
            });

            models.Users.belongsToMany(models.Recipes, {
                through: "FavoriteRecipes",
                as: "favoriteRecipes",
                foreignKey: "recipeId",
                otherKey: "userId",
            });
        }
    }
    Users.init(
        {
            id: {
                type: DataTypes.STRING,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            avatar: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            password: DataTypes.STRING,
            token: DataTypes.STRING,
        },
        {
            sequelize,
            timestamps: false,
            modelName: "Users",
        }
    );
    return Users;
};
