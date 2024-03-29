// External modules
const router = require("express").Router();

// Internal modules
const { sequelize } = require("../utils/db");
const { Location } = require("../models");

const {
    userExtractor,
    locationFinder,
    validateCreateLocation,
    validateUpdateLocation,
} = require("../utils/middleware/");

router.get("/", userExtractor, async (_req, res) => {
    const locations = await Location.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(locations);
});

router.post("/", userExtractor, validateCreateLocation, async (req, res) => {
    const location = await Location.create(req.body);
    res.status(201).json(location);
});

router.get("/:id", userExtractor, locationFinder, async (req, res) => {
    res.json(req.location);
});

router.put("/:id", userExtractor, validateUpdateLocation, async (req, res) => {
    const [rowsUpdate, [updatedLocation]] = await Location.update(req.body, {
        where: { id: req.params.id },
        returning: true,
    });

    if (rowsUpdate > 0) {
        return res.json(updatedLocation);
    } else {
        return res.status(404).json({ error: "Location not found" });
    }
});

module.exports = router;
