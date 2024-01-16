// External modules
const router = require("express").Router();

// Internal modules
const { sequelize } = require("../utils/db");
const { Examination, Location } = require("../models");

router.get("/", async (_req, res) => {
    const examinations = await Examination.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt", "patientId", "locationId"],
        },
        include: [
            {
                model: Location,
                attributes: { exclude: ["createdAt", "updatedAt"] },
            },
        ],
    });
    res.json(examinations);
});

module.exports = router;
