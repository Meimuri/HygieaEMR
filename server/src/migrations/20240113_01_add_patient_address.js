const { DataTypes } = require("sequelize");

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable("patient_addresses", {
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
            address: {
                type: DataTypes.STRING,
            },
            address2: {
                type: DataTypes.STRING,
            },
            city: {
                type: DataTypes.STRING,
            },
            province: {
                type: DataTypes.STRING,
            },
            zip_code: {
                type: DataTypes.INTEGER,
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
            "patient_addresses",
            "patient_addresses_patient_id_fkey"
        );
        await queryInterface.addConstraint("patient_addresses", {
            fields: ["patient_id"],
            type: "foreign key",
            name: "patient_addresses_patient_id_fkey",
            references: {
                table: "patients",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable("patient_addresses");
    },
};
