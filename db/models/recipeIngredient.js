import { DataTypes } from 'sequelize';

const RecipeIngredient = (sequelize) => {
    const RecipeIngredientModel = sequelize.define('RecipeIngredient', {
        id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        measure: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return RecipeIngredientModel;
}

export default RecipeIngredient;
