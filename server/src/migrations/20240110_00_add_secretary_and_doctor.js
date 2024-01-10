const { DataTypes } = require("sequelize");

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable("secretaries", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "users", key: "id" },
                onDelete: "CASCADE",
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            last_name: {
                type: DataTypes.STRING,
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
        await queryInterface.createTable("doctors", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "users", key: "id" },
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
            gender: {
                type: DataTypes.ENUM("Male", "Female"),
                allowNull: false,
            },
            specialization: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            license_no: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ptr_no: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            s2_no: {
                type: DataTypes.STRING,
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
        await queryInterface.removeConstraint(
            "doctors",
            "doctors_user_id_fkey"
        );
        await queryInterface.addConstraint("doctors", {
            fields: ["user_id"],
            type: "foreign key",
            name: "doctors_user_id_fkey",
            references: {
                table: "users",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        });
        await queryInterface.removeConstraint(
            "secretaries",
            "secretaries_user_id_fkey"
        );
        await queryInterface.addConstraint("secretaries", {
            fields: ["user_id"],
            type: "foreign key",
            name: "secretaries_user_id_fkey",
            references: {
                table: "users",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable("secretaries");
        await queryInterface.dropTable("doctors");
    },
};
