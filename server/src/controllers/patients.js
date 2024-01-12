// External modules
const router = require("express").Router();

// Internal modules
const { sequelize } = require("../utils/db");
const { Patient } = require("../models");

const {
    patientFinder,
    validateCreatePatient,
    validateUpdatePatient,
} = require("../utils/middleware/");

router.get("/", async (_req, res) => {
    const patients = await Patient.findAll();
    res.json(patients);
});

router.post("/", validateCreatePatient, async (req, res) => {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
});

router.get("/:id", patientFinder, async (req, res) => {
    res.json(req.patient);
});

router.put("/:id", validateUpdatePatient, async (req, res) => {
    const [rowsUpdate, [updatedPatient]] = await Patient.update(req.body, {
        where: {
            id: req.params.id,
        },
        returning: true,
    });
    if (rowsUpdate > 0) {
        return res.json(updatedPatient);
    } else {
        return res.status(404).json({ error: "Patient not found" });
    }
});

module.exports = router;
