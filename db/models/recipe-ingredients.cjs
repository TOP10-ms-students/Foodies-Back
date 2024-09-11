"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class RecipeIngredients extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    RecipeIngredients.init(
        {
            recipeId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ingredientId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            measure: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            timestamps: false,
            modelName: "RecipeIngredients",
        }
    );
    return RecipeIngredients;
};
