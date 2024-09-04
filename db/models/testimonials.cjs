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
            models.Users.hasMany(models.Testimonials, {
                foreignKey: {
                    name: "owner",
                    allowNull: false,
                },
            });
            models.Testimonials.belongsTo(models.Users, {
                foreignKey: {
                    name: "owner",
                    allowNull: false,
                },
                onDelete: "CASCADE",
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
            owner: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            testimonial: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: false,
            modelName: "Testimonials",
        }
    );
    return Testimonials;
};
