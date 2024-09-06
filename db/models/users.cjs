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
                foreignKey: "userId",
                otherKey: "recipeId",
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
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            avatar: {
                type: DataTypes.STRING,
                defaultValue: null,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            token: {
                type: DataTypes.STRING,
                defaultValue: null,
            },
        },
        {
            sequelize,
            timestamps: false,
            modelName: "Users",
        }
    );
    return Users;
};
