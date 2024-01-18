const jwt = require("jsonwebtoken");
const { SECRET } = require("../../config");
const { User } = require("../../../models/");

const userExtractor = async (req, res, next) => {
    if (req.token) {
        const decodedToken = jwt.verify(req.token.substring(7), SECRET);
        if (!decodedToken.id) {
            return res.status(401).json({ error: "Invalid token" });
        } else {
            const user = await User.findByPk(decodedToken.id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            req.user = user;
        }
    } else {
        return res.status(401).json({ error: "Missing token" });
    }
    next();
};

module.exports = userExtractor;
