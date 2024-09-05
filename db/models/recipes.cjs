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
            // define association here
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

            models.Recipes.belongsToMany(models.Ingredients, {
                through: "RecipeIngredients",
                as: "ingredients",
                foreignKey: "recipeId",
                otherKey: "ingredientId",
            });

            models.Recipes.belongsToMany(models.Users, {
                through: "FavoriteRecipes",
                as: "likedBy",
                foreignKey: "userId",
                otherKey: "recipeId",
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
            title: DataTypes.STRING,
            category: DataTypes.STRING,
            owner: DataTypes.STRING,
            area: DataTypes.STRING,
            instructions: DataTypes.TEXT,
            description: DataTypes.TEXT,
            thumb: DataTypes.STRING,
            time: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Recipes",
        }
    );
    return Recipes;
};
