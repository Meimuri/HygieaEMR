const { sequelize } = require("../../db");
const { Patient } = require("../../../models");

const patientsInDb = async () => {
    const patients = await Patient.findAll();
    return patients;
};

const deleteSelectedPatients = async () => {
    try {
        await sequelize.query("DELETE FROM patients");
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

module.exports = {
    patientsInDb,
    deleteSelectedPatients,
};
