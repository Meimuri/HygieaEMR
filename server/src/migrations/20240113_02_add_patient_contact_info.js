const { DataTypes } = require("sequelize");

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable("patient_contact_infos", {
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
            home_phone: {
                type: DataTypes.STRING,
            },
            work_phone: {
                type: DataTypes.STRING,
            },
            mobile_phone_primary: {
                type: DataTypes.STRING,
            },
            mobile_phone_secondary: {
                type: DataTypes.STRING,
            },
            email_address: {
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
            "patient_contact_infos",
            "patient_contact_infos_patient_id_fkey"
        );
        await queryInterface.addConstraint("patient_contact_infos", {
            fields: ["patient_id"],
            type: "foreign key",
            name: "patient_contact_infos_patient_id_fkey",
            references: {
                table: "patients",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable("patient_contact_infos");
    },
};
