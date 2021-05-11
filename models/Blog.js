const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {};

Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contents: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            },
        },
        date: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog',
    }
);

module.exports = Blog;