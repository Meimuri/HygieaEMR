const { DataTypes } = require("sequelize");

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable("patients", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            middle_name: {
                type: DataTypes.STRING,
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            birth_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            gender: {
                type: DataTypes.ENUM("Male", "Female"),
                allowNull: false,
            },
            marital_status: {
                type: DataTypes.ENUM(
                    "Single",
                    "Married",
                    "Divorced",
                    "Widowed",
                    "Separated"
                ),
                allowNull: false,
            },
            blood_type: {
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
            referrer_name: {
                type: DataTypes.STRING,
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
        await queryInterface.dropTable("patients");
    },
};
