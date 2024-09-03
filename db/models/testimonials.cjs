"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Testimonials extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Users.hasMany(models.Testimonials, {
                foreignKey: {
                    name: "owner",
                },
            });
        }
    }
    Testimonials.init(
        {
            id: {
                type: DataTypes.STRING,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            owner: DataTypes.STRING,
            testimonial: DataTypes.TEXT,
        },
        {
            sequelize,
            timestamps: false,
            modelName: "Testimonials",
        }
    );
    return Testimonials;
};
