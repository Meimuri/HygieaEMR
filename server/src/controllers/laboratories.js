// External modules
const router = require("express").Router();

// Internal modules
const { sequelize } = require("../utils/db");
const { Laboratory } = require("../models");

const {
    laboratoryFinder,
    validateCreateLaboratory,
    validateUpdateLaboratory,
} = require("../utils/middleware/");

router.get("/", async (_req, res) => {
    const laboratories = await Laboratory.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
    });
    res.json(laboratories);
});

router.post("/", validateCreateLaboratory, async (req, res) => {
    const laboratory = await Laboratory.create(req.body);
    res.status(201).json(laboratory);
});

module.exports = router;
