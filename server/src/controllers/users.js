// External modules
const bcrypt = require("bcrypt");
const router = require("express").Router();

// Internal modules
const { User } = require("../models");
const { userFinder, validateUser } = require("../utils/middleware/");

router.get("/", async (_req, res) => {
    const users = await User.findAll();
    res.json(users);
});

router.post("/", validateUser, async (req, res) => {
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

router.put("/:id", async (req, res) => {
    const { username } = req.body;

    if (!username || typeof username !== "string") {
        return res
            .status(400)
            .json({ error: "Username is required and must be a string" });
    }

    const [rowsUpdate, [updatedUser]] = await User.update(
        { username: req.body.username },
        {
            where: {
                id: req.params.id,
            },
            returning: true,
        }
    );

    if (rowsUpdate > 0) {
        return res.json(updatedUser);
    } else {
        return res.status(404).json({ error: "User not found" });
    }
});

module.exports = router;
