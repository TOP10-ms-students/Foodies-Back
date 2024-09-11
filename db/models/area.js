import { DataTypes } from 'sequelize';

const Area = (sequelize) => {
    const AreaModel = sequelize.define('Area', {
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
    });

    return AreaModel;
};

export default Area;
