// External modules
const router = require("express").Router();

// Internal modules
const { sequelize } = require("../utils/db");
const { Patient } = require("../models");

const {
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

module.exports = router;
