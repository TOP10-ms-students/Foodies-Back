import { DataTypes } from 'sequelize';

const Follower = (sequelize) => {
    const FollowerModel = sequelize.define('Follower', {
        id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
    });

    return FollowerModel;
}

export default Follower;
