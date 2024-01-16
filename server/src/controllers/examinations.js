// External modules
const router = require("express").Router();

// Internal modules
const { sequelize } = require("../utils/db");
const {
    Examination,
    Location,
    Laboratory,
    ExaminationLaboratory,
} = require("../models");

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
            {
                model: Laboratory,
                attributes: { exclude: ["createdAt", "updatedAt"] },
                through: {
                    attributes: [],
                },
            },
        ],
    });
    res.json(examinations);
});

router.post("/", validateCreateExamination, async (req, res) => {
    const result = await sequelize.transaction(async (t) => {
        const examination = await Examination.create(req.body, {
            transaction: t,
        });
        // Hard Code Adding Laboratory to Examination for now
        await ExaminationLaboratory.create(
            {
                examinationId: examination.id,
                laboratoryId: 1,
            },
            { transaction: t }
        );

        await ExaminationLaboratory.create(
            {
                examinationId: examination.id,
                laboratoryId: 2,
            },
            { transaction: t }
        );

        return examination;
    });
    res.status(201).json(result);
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
