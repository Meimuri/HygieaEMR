// External modules
const bcrypt = require("bcrypt");
const router = require("express").Router();

// Internal modules
const { User } = require("../models");
const { userFinder } = require("../utils/middleware/");

router.get("/", async (_req, res) => {
    const users = await User.findAll();
    res.json(users);
});

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const savedUser = await User.create({
        username,
        password: passwordHash,
    });
    res.status(201).json(savedUser);
});

router.get("/:id", userFinder, async (req, res) => {
    res.json(req.user);
});

module.exports = router;
