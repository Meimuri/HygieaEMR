const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();

const { SECRET } = require("../utils/config");
const User = require("../models/user/user");

const { validateLogin } = require("../utils/middleware/");

router.post("/", validateLogin, async (request, response) => {
    const { username, password } = request.body;

    const user = await User.findOne({
        where: {
            username: username,
        },
    });

    const passwordCorrect =
        user === null ? false : await bcrypt.compare(password, user.password);

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: "Invalid username or password",
        });
    }

    const userForToken = {
        id: user.id,
        username: user.username,
    };

    const token = jwt.sign(userForToken, SECRET, { expiresIn: "60s" });

    response
        .status(200)
        .send({ token, username: user.username, name: user.name });
});

module.exports = router;
