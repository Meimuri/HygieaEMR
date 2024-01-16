const { DataTypes } = require("sequelize");

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable("encounters", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            patient_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "patients", key: "id" },
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
            reason_for_visit: {
                type: DataTypes.TEXT,
            },
            chief_complaint: {
                type: DataTypes.TEXT,
            },
            notes: {
                type: DataTypes.TEXT,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable("encounters");
    },
};
