import { DataTypes } from 'sequelize';

const Testimonial = (sequelize) => {
    const TestimonialModel = sequelize.define('Testimonial', {
        id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        testimonial: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });

    TestimonialModel.associate = (models) => {
        TestimonialModel.belongsTo(models.User, {
            foreignKey: {
                name: 'ownerId',
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });
    };

    return TestimonialModel;
};

export default Testimonial;