// Internal modules
const { Laboratory } = require("../../../../models");

const laboratoryFinder = async (req, res, next) => {
    const laboratory = await Laboratory.findByPk(req.params.id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!laboratory) {
        return res.status(404).json({ error: "Laboratory not found" });
    }

    req.laboratory = laboratory;
    next();
};

module.exports = laboratoryFinder;
