// External modules
const router = require("express").Router();

// Internal modules
const { sequelize } = require("../utils/db");
const { Laboratory } = require("../models");

router.get("/", async (_req, res) => {
    const laboratories = await Laboratory.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
    });
    res.json(laboratories);
});

module.exports = router;
