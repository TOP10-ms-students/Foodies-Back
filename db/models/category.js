import { DataTypes } from 'sequelize';

const Category = (sequelize) => {
    const CategoryModel = sequelize.define('Category', {
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
        img: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    CategoryModel.associate = (models) => {
        CategoryModel.hasMany(models.Recipe, {
            foreignKey: {
                name: 'categoryId',
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });
    };

    return CategoryModel;
};

export default Category;
