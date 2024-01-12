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

module.exports = router;
