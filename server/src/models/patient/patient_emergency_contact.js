// External modules
const { Model, DataTypes } = require("sequelize");

// Internal modules
const { sequelize } = require("../../utils/db");

class PatientEmergencyContact extends Model {}

PatientEmergencyContact.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        homePhone: {
            type: DataTypes.STRING,
        },
        mobilePrimary: {
            type: DataTypes.STRING,
        },
        relationship: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: "patient_emergency_contacts",
    }
);

module.exports = PatientEmergencyContact;
