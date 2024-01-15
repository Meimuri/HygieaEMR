const { Patient } = require("../../../models");

const patientsInDb = async () => {
    const patients = await Patient.findAll();
    return patients;
};

module.exports = {
    patientsInDb,
};
