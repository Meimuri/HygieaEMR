const { DataTypes } = require("sequelize");

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable("examinations", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            encounter_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "encounters", key: "id" },
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            location_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "locations", key: "id" },
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
        await queryInterface.dropTable("examinations");
    },
};
