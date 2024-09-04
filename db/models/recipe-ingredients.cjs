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
            id: {
                type: DataTypes.STRING,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            recipeId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ingredientId: {
                type: DataTypes.STRING,
                allowNull: false,
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
