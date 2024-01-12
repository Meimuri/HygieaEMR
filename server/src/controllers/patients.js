// External modules
const router = require("express").Router();

// Internal modules
const { sequelize } = require("../utils/db");
const { Patient } = require("../models");

// Add Patient Middleware
// const {
//     userFinder,
//     validateCreateUser,
//     validateUpdateUser,
// } = require("../utils/middleware/");

router.get("/", async (_req, res) => {
    const patients = await Patient.findAll();
    res.json(patients);
});

module.exports = router;
