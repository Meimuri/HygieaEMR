const { DataTypes } = require("sequelize");

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable("users", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_type: {
                type: DataTypes.ENUM("Doctor", "Secretary"),
                allowNull: false,
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
        await queryInterface.dropTable("users");
    },
};
