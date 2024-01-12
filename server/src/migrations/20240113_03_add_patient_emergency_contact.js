const { DataTypes } = require("sequelize");

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable("patient_emergency_contacts", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            patient_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "users", key: "id" },
            },
            first_name: {
                type: DataTypes.STRING,
            },
            last_name: {
                type: DataTypes.STRING,
            },
            home_phone: {
                type: DataTypes.STRING,
            },
            mobile_primary: {
                type: DataTypes.STRING,
            },
            relationship: {
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
        await queryInterface.removeConstraint(
            "patient_emergency_contacts",
            "patient_emergency_contacts_patient_id_fkey"
        );
        await queryInterface.addConstraint("patient_emergency_contacts", {
            fields: ["patient_id"],
            type: "foreign key",
            name: "patient_emergency_contacts_patient_id_fkey",
            references: {
                table: "patients",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable("patient_emergency_contacts");
    },
};
