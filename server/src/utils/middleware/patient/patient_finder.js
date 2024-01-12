// Internal modules
const { Patient, PatientAddress } = require("../../../models");

const patientFinder = async (req, res, next) => {
    // const patient = await Patient.findByPk(req.params.id);

    const patient = await Patient.findByPk(req.params.id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
            {
                model: PatientAddress,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "patientId"],
                },
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
