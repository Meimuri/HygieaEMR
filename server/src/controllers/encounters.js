// External modules
const router = require("express").Router();

// Internal modules
const { sequelize } = require("../utils/db");
const { Encounter, Location, Doctor } = require("../models");

const {
    encounterFinder,
    validateCreateEncounter,
    validateUpdateEncounter,
} = require("../utils/middleware/");

router.get("/", async (_req, res) => {
    const encounters = await Encounter.findAll({
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
                attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
            },
        ],
    });
    res.json(encounters);
});

router.post("/", validateCreateEncounter, async (req, res) => {
    const encounter = await Encounter.create(req.body);
    res.status(201).json(encounter);
});

router.get("/:id", encounterFinder, async (req, res) => {
    res.json(req.encounter);
});

router.put("/:id", validateUpdateEncounter, async (req, res) => {
    const [rowsUpdate, [updatedEncounter]] = await Encounter.update(req.body, {
        where: { id: req.params.id },
        returning: true,
    });

    if (rowsUpdate > 0) {
        return res.json(updatedEncounter);
    } else {
        return res.status(404).json({ error: "Encounter not found" });
    }
});

module.exports = router;
