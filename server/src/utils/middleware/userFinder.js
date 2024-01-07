// Internal modules
const { User } = require("../../models/");

const userFinder = async (req, res, next) => {
    const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ["id", "password", "createdAt", "updatedAt"] },
    });

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    } else {
        req.user = user;
        next();
    }
};

module.exports = userFinder;
