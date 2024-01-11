// External modules
const bcrypt = require("bcrypt");
const router = require("express").Router();

// Internal modules
const { sequelize } = require("../utils/db");
const { User, Secretary, Doctor } = require("../models");
const {
    userFinder,
    validateCreateUser,
    validateUpdateUser,
} = require("../utils/middleware/");

router.get("/", async (_req, res) => {
    const users = await User.findAll({
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

    const usersWithDetails = users.map((user) => {
        let details;
        if (user.userType === "Doctor" && user.doctor) {
            details = user.doctor;
        } else if (user.userType === "Secretary" && user.secretary) {
            details = user.secretary;
        }

        const { doctor, secretary, ...userWithoutDetails } = user.toJSON();
        return { ...userWithoutDetails, details };
    });

    res.json(usersWithDetails);
});

router.post("/", validateCreateUser, async (req, res) => {
    const { username, password, userType, ...otherDetails } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    let Model;
    if (userType === "Doctor") {
        Model = Doctor;
    } else if (userType === "Secretary") {
        Model = Secretary;
    } else {
        return res.status(400).json({ error: "Invalid user type" });
    }

    const result = await sequelize.transaction(async (t) => {
        const user = await User.create(
            {
                username,
                password: passwordHash,
                userType,
            },
            { transaction: t }
        );

        const details = await Model.create(
            {
                ...otherDetails,
                userId: user.id,
            },
            { transaction: t }
        );

        return {
            id: user.id,
            username: user.username,
            userType: user.userType,
            details: {
                id: details.id,
                firstName: details.firstName,
                lastName: details.lastName,
                ...(userType === "Doctor" && {
                    middleName: details.middleName,
                    gender: details.gender,
                    specialization: details.specialization,
                    licenseNo: details.licenseNo,
                    ptrNo: details.ptrNo,
                    s2No: details.s2No,
                }),
            },
        };
    });

    res.status(201).json(result);
});

router.get("/:id", userFinder, async (req, res) => {
    res.json(req.user);
});

router.put("/:id", validateUpdateUser, async (req, res) => {
    const { userType, ...otherDetails } = req.body;

    let Model;
    if (userType === "Doctor") {
        Model = Doctor;
    } else if (userType === "Secretary") {
        Model = Secretary;
    } else {
        return res.status(400).json({ error: "Invalid user type" });
    }

    if (Object.keys(otherDetails).length === 0) {
        return res.status(204).send(); // Nothing changed
    }

    const [rowsUpdate, [updatedUser]] = await Model.update(
        { ...otherDetails },
        {
            where: {
                userId: req.params.id,
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

// router.put("/:id", async (req, res) => {
//     const { username } = req.body;

//     if (!username || typeof username !== "string") {
//         return res
//             .status(400)
//             .json({ error: "Username is required and must be a string" });
//     }

//     const [rowsUpdate, [updatedUser]] = await User.update(
//         { username: req.body.username },
//         {
//             where: {
//                 id: req.params.id,
//             },
//             returning: true,
//         }
//     );

//     if (rowsUpdate > 0) {
//         return res.json(updatedUser);
//     } else {
//         return res.status(404).json({ error: "User not found" });
//     }
// });

router.delete("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();

    res.status(200).json({ message: "User deleted successfully" });
});

module.exports = router;
