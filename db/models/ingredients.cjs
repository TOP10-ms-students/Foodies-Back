"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Ingredients extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            models.Recipes.belongsToMany(models.Ingredients, {
                through: "RecipeIngredients",
            });
        }
    }
    Ingredients.init(
        {
            id: {
                type: DataTypes.STRING,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            desc: DataTypes.TEXT,
            img: DataTypes.STRING,
        },
        {
            sequelize,
            timestamps: false,
            modelName: "Ingredients",
        }
    );
    return Ingredients;
};
