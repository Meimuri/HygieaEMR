const { DataTypes } = require("sequelize");

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable("examination_laboratories", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            examination_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "examinations", key: "id" },
            },
            laboratory_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "laboratories", key: "id" },
            },
            read: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable("examination_laboratories");
    },
};
