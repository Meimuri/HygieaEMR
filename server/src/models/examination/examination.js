// External modules
const { Model, DataTypes } = require("sequelize");

// Internal modules
const { sequelize } = require("../../utils/db");

class Examination extends Model {}

Examination.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        encounterId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        locationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        subjective: {
            type: DataTypes.TEXT,
        },
        objective: {
            type: DataTypes.TEXT,
        },
        assessment: {
            type: DataTypes.TEXT,
        },
        plan: {
            type: DataTypes.TEXT,
        },
        diagnosis: {
            type: DataTypes.TEXT,
        },
        notes: {
            type: DataTypes.TEXT,
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: "examinations",
    }
);

module.exports = Examination;
