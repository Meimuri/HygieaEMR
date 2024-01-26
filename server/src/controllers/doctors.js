// External modules
const router = require("express").Router();

// Internal modules
const { sequelize } = require("../utils/db");
const { Doctor } = require("../models");

const { userExtractor } = require("../utils/middleware/");

router.get("/", userExtractor, async (_req, res) => {
    const doctors = await Doctor.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(doctors);
});

module.exports = router;
