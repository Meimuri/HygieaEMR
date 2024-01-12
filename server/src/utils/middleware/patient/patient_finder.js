// Internal modules
const { Patient } = require("../../../models");

const patientFinder = async (req, res, next) => {
    const patient = await Patient.findByPk(req.params.id);

    if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
    }

    req.patient = patient;
    next();
};

module.exports = patientFinder;
