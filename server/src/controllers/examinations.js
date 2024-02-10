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
    userExtractor,
    examinationFinder,
    validateCreateExamination,
    validateUpdateExamination,
} = require("../utils/middleware/");

const {
    returnUpdatedExamination,
} = require("../utils/helper/examination_helper");

router.get("/", userExtractor, async (_req, res) => {
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

router.post("/", userExtractor, validateCreateExamination, async (req, res) => {
    const { laboratory, ...examinationData } = req.body;

    const result = await sequelize.transaction(async (t) => {
        const examination = await Examination.create(examinationData, {
            transaction: t,
        });

        if (laboratory) {
            for (let i = 0; i < laboratory.length; i++) {
                await ExaminationLaboratory.create(
                    {
                        examinationId: examination.id,
                        laboratoryId: laboratory[i],
                    },
                    { transaction: t }
                );
            }
        }

        return examination;
    });

    res.status(201).json(result);
});

router.get("/:id", userExtractor, examinationFinder, async (req, res) => {
    res.json(req.examination);
});

router.put(
    "/:id",
    userExtractor,
    validateUpdateExamination,
    async (req, res) => {
        const { laboratory, ...examinationData } = req.body;

        const result = await sequelize.transaction(async (t) => {
            const [rowsUpdate, [updatedExamination]] = await Examination.update(
                examinationData,
                {
                    where: { id: req.params.id },
                    returning: true,
                    transaction: t,
                }
            );

            if (rowsUpdate > 0) {
                await ExaminationLaboratory.destroy({
                    where: { examinationId: req.params.id },
                    transaction: t,
                });

                if (laboratory) {
                    for (let i = 0; i < laboratory.length; i++) {
                        await ExaminationLaboratory.create(
                            {
                                examinationId: req.params.id,
                                laboratoryId: laboratory[i],
                            },
                            { transaction: t }
                        );
                    }
                }

                return updatedExamination;
            } else {
                return res.status(404).json({ error: "Examination not found" });
            }
        });

        if (result) {
            const returnExamination = await returnUpdatedExamination(result.id);
            return res.json(returnExamination);
        } else {
            return res.status(404).json({ error: "Examination not found" });
        }
    }
);

module.exports = router;
