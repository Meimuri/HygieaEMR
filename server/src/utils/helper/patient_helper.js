const {
    Patient,
    PatientAddress,
    PatientContactInfo,
    PatientEmergencyContact,
} = require("../../models/");

const returnUpdatedPatient = async (id) => {
    const patient = await Patient.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
            {
                model: PatientAddress,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "patientId"],
                },
            },
            {
                model: PatientContactInfo,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "patientId"],
                },
            },
            {
                model: PatientEmergencyContact,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "patientId"],
                },
            },
        ],
    });
    return patient;
};

module.exports = {
    returnUpdatedPatient,
};
