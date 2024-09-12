import { DataTypes } from 'sequelize';

const Ingredient = (sequelize) => {
    const IngredientModel = sequelize.define('Ingredient', {
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
        desc: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        img: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    IngredientModel.associate = (models) => {
        IngredientModel.belongsToMany(models.Recipe, {
            through: models.RecipeIngredient,
            as: 'ingredient',
            foreignKey: {
                name: 'ingredientId',
                allowNull: false,
            },
            otherKey: 'recipeId',
            onDelete: 'CASCADE',
        });
    };

    return IngredientModel;
};

export default Ingredient;
