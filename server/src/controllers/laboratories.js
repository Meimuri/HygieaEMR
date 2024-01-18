// External modules
const router = require("express").Router();

// Internal modules
const { sequelize } = require("../utils/db");
const { Laboratory } = require("../models");

const {
    userExtractor,
    laboratoryFinder,
    validateCreateLaboratory,
    validateUpdateLaboratory,
} = require("../utils/middleware/");

router.get("/", userExtractor, async (_req, res) => {
    const laboratories = await Laboratory.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
    });
    res.json(laboratories);
});

router.post("/", userExtractor, validateCreateLaboratory, async (req, res) => {
    const laboratory = await Laboratory.create(req.body);
    res.status(201).json(laboratory);
});

router.get("/:id", userExtractor, laboratoryFinder, async (req, res) => {
    res.json(req.laboratory);
});

router.put(
    "/:id",
    userExtractor,
    validateUpdateLaboratory,
    async (req, res) => {
        const [rowsUpdate, [updatedLaboratory]] = await Laboratory.update(
            req.body,
            {
                where: { id: req.params.id },
                returning: true,
            }
        );

        if (rowsUpdate > 0) {
            return res.json(updatedLaboratory);
        } else {
            return res.status(404).json({ error: "Laboratory not found" });
        }
    }
);

module.exports = router;
