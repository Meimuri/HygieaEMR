// Internal modules
const { Encounter, Location, Doctor } = require("../../../models");

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
        ],
    });

    if (!encounter) {
        return res.status(404).json({ error: "Encounter not found" });
    }

    req.encounter = encounter;
    next();
};

module.exports = encounterFinder;
