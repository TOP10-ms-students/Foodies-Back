"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Followers extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    }
    Followers.init(
        {
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            followerId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: false,
            modelName: "Followers",
        }
    );
    return Followers;
};
