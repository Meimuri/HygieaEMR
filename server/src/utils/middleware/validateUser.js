const validateUser = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || typeof username !== "string") {
        return res
            .status(400)
            .json({ error: "Username is required and must be a string" });
    }

    if (!password || typeof password !== "string" || password.length < 3) {
        return res.status(400).json({
            error: "Password is required, must be a string, and should have 3 or more characters",
        });
    }

    next();
};

module.exports = validateUser;
