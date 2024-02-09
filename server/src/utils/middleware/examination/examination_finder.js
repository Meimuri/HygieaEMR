// Internal modules
const { Examination, Location, Laboratory } = require("../../../models");

const examinationFinder = async (req, res, next) => {
    const examination = await Examination.findOne({
        where: { encounterId: req.params.id },
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

    if (!examination) {
        return res.status(404).json({ error: "Examination not found" });
    }

    req.examination = examination;
    next();
};

module.exports = examinationFinder;
