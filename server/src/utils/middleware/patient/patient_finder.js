// Internal modules
const {
    Patient,
    PatientAddress,
    PatientContactInfo,
    PatientEmergencyContact,
    Encounter,
    Location,
    Doctor,
    Examination,
} = require("../../../models");

const patientFinder = async (req, res, next) => {
    const patient = await Patient.findByPk(req.params.id, {
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
                        ],
                    },
                ],
            },
        ],
    });

    if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
    }

    req.patient = patient;
    next();
};

module.exports = patientFinder;
