// External modules
const { Model, DataTypes } = require("sequelize");

// Internal modules
const { sequelize } = require("../../utils/db");

class PatientAddress extends Model {}

PatientAddress.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        address: {
            type: DataTypes.STRING,
        },
        address2: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        province: {
            type: DataTypes.STRING,
        },
        zipCode: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: "patient_addresses",
    }
);

module.exports = PatientAddress;
