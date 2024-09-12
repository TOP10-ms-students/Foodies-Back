import { DataTypes } from 'sequelize';

const Recipe = (sequelize) => {
    const RecipeModel = sequelize.define('Recipe', {
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
    });

    RecipeModel.associate = (models) => {
        RecipeModel.belongsTo(models.User, {
            as: 'owner',
            foreignKey: {
                name: 'ownerId',
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });

        RecipeModel.belongsTo(models.Area, {
            foreignKey: {
                name: 'areaId',
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });

        RecipeModel.belongsToMany(models.Ingredient, {
            through: 'RecipeIngredient',
            as: 'ingredients',
            foreignKey: {
                name: 'recipeId',
                allowNull: false,
            },
            otherKey: 'ingredientId',
            onDelete: 'CASCADE',
        });

        RecipeModel.belongsToMany(models.User, {
            through: 'FavoriteRecipe',
            as: 'recipe',
            foreignKey: {
                name: 'recipeId',
                allowNull: false,
            },
            otherKey: 'userId',
            onDelete: 'CASCADE',
        });
    };

    return RecipeModel;
};

export default Recipe;
