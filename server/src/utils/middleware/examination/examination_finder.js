// Internal modules
const { Examination, Location } = require("../../../models");

const examinationFinder = async (req, res, next) => {
    const examination = await Examination.findByPk(req.params.id, {
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

    if (!examination) {
        return res.status(404).json({ error: "Examination not found" });
    }

    req.examination = examination;
    next();
};

module.exports = examinationFinder;
