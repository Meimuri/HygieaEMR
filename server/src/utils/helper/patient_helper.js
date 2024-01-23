const {
    Patient,
    PatientAddress,
    PatientContactInfo,
    PatientEmergencyContact,
    Encounter,
    Doctor,
    Examination,
    Laboratory,
    Location,
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
            {
                model: Encounter,
                attributes: {
                    exclude: [
                        "createdAt",
                        "updatedAt",
                        "patientId",
                        "locationId",
                        "doctorId",
                    ],
                },
                include: [
                    {
                        model: Location,
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                    },
                    {
                        model: Doctor,
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "userId"],
                        },
                    },
                    {
                        model: Examination,
                        attributes: {
                            exclude: [
                                "createdAt",
                                "updatedAt",
                                "encounterId",
                                "locationId",
                            ],
                        },
                        include: [
                            {
                                model: Location,
                                attributes: {
                                    exclude: ["createdAt", "updatedAt"],
                                },
                            },
                            {
                                model: Laboratory,
                                attributes: {
                                    exclude: ["createdAt", "updatedAt"],
                                },
                                through: {
                                    attributes: [],
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    });
    return patient;
};

module.exports = {
    returnUpdatedPatient,
};
