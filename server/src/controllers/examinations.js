// External modules
const router = require("express").Router();

// Internal modules
const { sequelize } = require("../utils/db");
const { Examination, Location } = require("../models");

const {
    examinationFinder,
    validateCreateExamination,
    validateUpdateExamination,
} = require("../utils/middleware/");

router.get("/", async (_req, res) => {
    const examinations = await Examination.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt", "encounterId", "locationId"],
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

router.post("/", validateCreateExamination, async (req, res) => {
    const examination = await Examination.create(req.body);
    res.status(201).json(examination);
});

router.get("/:id", examinationFinder, async (req, res) => {
    res.json(req.examination);
});

router.put("/:id", validateUpdateExamination, async (req, res) => {
    const [rowsUpdate, [updatedExamination]] = await Examination.update(
        req.body,
        {
            where: { id: req.params.id },
            returning: true,
        }
    );

    if (rowsUpdate > 0) {
        return res.json(updatedExamination);
    } else {
        return res.status(404).json({ error: "Examination not found" });
    }
});

module.exports = router;
