"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Recipes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            models.Users.hasMany(models.Recipes, {
                foreignKey: {
                    name: "owner",
                },
            });

            models.Categories.hasMany(models.Recipes, {
                foreignKey: {
                    name: "category",
                },
            });

            models.Ingredients.belongsToMany(models.Recipes, {
                through: "RecipeIngredients",
            });
        }
    }
    Recipes.init(
        {
            id: {
                type: DataTypes.STRING,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            owner: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            area: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            instructions: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            thumb: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            time: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Recipes",
        }
    );
    return Recipes;
};
