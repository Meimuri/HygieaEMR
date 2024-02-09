// External modules
const router = require("express").Router();

// Internal modules
const { sequelize } = require("../utils/db");
const { Encounter, Location, Doctor } = require("../models");

const {
    userExtractor,
    encounterFinder,
    validateCreateEncounter,
    validateUpdateEncounter,
} = require("../utils/middleware/");

const {
    returnCreatedEncounter,
    returnUpdatedEncounter,
} = require("../utils/helper/encounter_helper");

router.get("/", userExtractor, async (req, res) => {
    const patientId = req.query.patientId;

    if (!patientId) {
        return res.status(400).json({ error: "Patient Id is required" });
    }

    const encounters = await Encounter.findAll({
        where: { patientId },
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

router.post("/", userExtractor, validateCreateEncounter, async (req, res) => {
    const createdEncounter = await Encounter.create(req.body);

    const returnEncounter = await returnCreatedEncounter(createdEncounter.id);

    res.status(201).json(returnEncounter);
});

router.get("/:id", userExtractor, encounterFinder, async (req, res) => {
    res.json(req.encounter);
});

router.put("/:id", userExtractor, validateUpdateEncounter, async (req, res) => {
    const [rowsUpdate, [updatedEncounter]] = await Encounter.update(req.body, {
        where: { id: req.params.id },
        returning: true,
    });

    if (rowsUpdate > 0) {
        const returnEncounter = await returnUpdatedEncounter(
            updatedEncounter.id
        );
        return res.json(returnEncounter);
    } else {
        return res.status(404).json({ error: "Encounter not found" });
    }
});

module.exports = router;
