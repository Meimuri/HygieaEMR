// External modules
const { Model, DataTypes } = require("sequelize");

// Internal modules
const { sequelize } = require("../utils/db");

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: "users",
    }
);

module.exports = User;
