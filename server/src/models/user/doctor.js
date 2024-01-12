// External modules
const { Model, DataTypes } = require("sequelize");

// Internal modules
const { sequelize } = require("../../utils/db");

class Doctor extends Model {}

Doctor.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        middleName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        gender: {
            type: DataTypes.ENUM("Male", "Female"),
            allowNull: false,
        },
        specialization: {
            type: DataTypes.STRING,
        },
        licenseNo: {
            type: DataTypes.STRING,
        },
        ptrNo: {
            type: DataTypes.STRING,
        },
        s2No: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: "doctors",
    }
);

module.exports = Doctor;
