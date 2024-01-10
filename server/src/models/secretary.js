// External modules
const { Model, DataTypes } = require("sequelize");

// Internal modules
const { sequelize } = require("../utils/db");

class Secretary extends Model {}

Secretary.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: "secretaries",
    }
);

module.exports = Secretary;
