// Internal modules
const { User, Secretary, Doctor } = require("../../models/");

const userFinder = async (req, res, next) => {
    const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        include: [
            {
                model: Doctor,
                required: false,
                as: "doctor",
                attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
            },
            {
                model: Secretary,
                required: false,
                as: "secretary",
                attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
            },
        ],
    });

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    } else {
        let details;
        if (user.userType === "Doctor" && user.doctor) {
            details = user.doctor;
        } else if (user.userType === "Secretary" && user.secretary) {
            details = user.secretary;
        }

        const { doctor, secretary, ...userWithoutDetails } = user.toJSON();
        const userWithDetails = { ...userWithoutDetails, details };

        req.user = userWithDetails;
        next();
    }
};

module.exports = userFinder;
