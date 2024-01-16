// External modules
const { Model, DataTypes } = require("sequelize");

// Internal modules
const { sequelize } = require("../../utils/db");

class Encounter extends Model {}

Encounter.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        patientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        class: {
            type: DataTypes.ENUM(
                "Inpatient",
                "Outpatient",
                "Ambulatory",
                "Emergency",
                "Home Visit",
                "Field Visit",
                "Virtual",
                "Others"
            ),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(
                "Planned",
                "Arrived",
                "In Progress",
                "Finished",
                "Cancelled"
            ),
            allowNull: false,
        },
        reasonForVisit: {
            type: DataTypes.TEXT,
        },
        chiefComplaint: {
            type: DataTypes.TEXT,
        },
        notes: {
            type: DataTypes.TEXT,
        },
        locationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: "encounters",
    }
);

module.exports = Encounter;
