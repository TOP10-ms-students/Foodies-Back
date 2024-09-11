import { DataTypes } from 'sequelize';

const User = (sequelize) => {
    const UserModel = sequelize.define('User', {
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        emailCanonical: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        token: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
    });

    UserModel.associate = (models) => {
        UserModel.hasMany(models.Recipe, {
            foreignKey: {
                name: 'ownerId',
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });
        UserModel.belongsToMany(models.Recipe, {
            through: 'favorite_recipes',
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
            otherKey: 'recipeId',
            onDelete: 'CASCADE',
        });

        UserModel.belongsToMany(models.User, {
            through: 'follower',
            as: 'followers',
            foreignKey: {
                name: 'followerId',
                allowNull: false,
            },
            otherKey: 'userId',
            onDelete: 'CASCADE',
        });

        UserModel.belongsToMany(models.User, {
            through: 'follower',
            as: 'followedBy',
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
            otherKey: 'followerId',
            onDelete: 'CASCADE',
        });
    };

    return UserModel;
};

export default User;
