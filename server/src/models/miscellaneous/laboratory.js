// External modules
const { Model, DataTypes } = require("sequelize");

// Internal modules
const { sequelize } = require("../../utils/db");

class Laboratory extends Model {}

Laboratory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: "laboratories",
    }
);

module.exports = Laboratory;
