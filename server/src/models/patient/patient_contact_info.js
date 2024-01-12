// External modules
const { Model, DataTypes } = require("sequelize");

// Internal modules
const { sequelize } = require("../../utils/db");

class PatientContactInfo extends Model {}

PatientContactInfo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        homePhone: {
            type: DataTypes.STRING,
        },
        workPhone: {
            type: DataTypes.STRING,
        },
        mobilePhonePrimary: {
            type: DataTypes.STRING,
        },
        mobilePhoneSecondary: {
            type: DataTypes.STRING,
        },
        emailAddress: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: "patient_contact_infos",
    }
);

module.exports = PatientContactInfo;
