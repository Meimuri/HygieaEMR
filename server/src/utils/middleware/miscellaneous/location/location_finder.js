// Internal modules
const { Location } = require("../../../../models");

const locationFinder = async (req, res, next) => {
    const location = await Location.findByPk(req.params.id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!location) {
        return res.status(404).json({ error: "Location not found" });
    }

    req.location = location;
    next();
};

module.exports = locationFinder;
