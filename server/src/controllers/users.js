// External modules
const bcrypt = require("bcrypt");
const router = require("express").Router();

// Internal modules
const { User } = require("../models");

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

module.exports = router;
