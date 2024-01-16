// Internal modules
const {
    Encounter,
    Location,
    Doctor,
    Examination,
    Laboratory,
} = require("../../../models");

const encounterFinder = async (req, res, next) => {
    const encounter = await Encounter.findByPk(req.params.id, {
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
            {
                model: Examination,
                attributes: {
                    exclude: [
                        "createdAt",
                        "updatedAt",
                        "encounterId",
                        "locationId",
                    ],
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
            },
        ],
    });

    if (!encounter) {
        return res.status(404).json({ error: "Encounter not found" });
    }

    req.encounter = encounter;
    next();
};

module.exports = encounterFinder;
