// External modules
const { Model, DataTypes } = require("sequelize");

// Internal modules
const { sequelize } = require("../../utils/db");

class Patient extends Model {}

Patient.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        middleName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        gender: {
            type: DataTypes.ENUM("Male", "Female"),
            allowNull: false,
        },
        maritalStatus: {
            type: DataTypes.ENUM(
                "Single",
                "Married",
                "Divorced",
                "Widowed",
                "Separated"
            ),
            allowNull: false,
        },
        bloodType: {
            type: DataTypes.ENUM(
                "A",
                "B",
                "AB",
                "O",
                "A+",
                "A-",
                "B+",
                "B-",
                "AB+",
                "AB-",
                "O+",
                "O-"
            ),
            allowNull: false,
        },
        referrerName: {
            type: DataTypes.STRING,
        },
        notes: {
            type: DataTypes.TEXT,
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: "patients",
    }
);

module.exports = Patient;
