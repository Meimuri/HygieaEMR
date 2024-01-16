const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../../utils/db");

class ExaminationLaboratory extends Model {}

ExaminationLaboratory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        examinationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        laboratoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: "examination_laboratories",
    }
);

module.exports = ExaminationLaboratory;
