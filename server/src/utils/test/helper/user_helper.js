const { sequelize } = require("../../db");
const bcrypt = require("bcrypt");
const { User, Doctor } = require("../../../models");
const data = require("../data");

const usersInDb = async () => {
    const users = await User.findAll();
    return users;
};

const truncateAndCascadeUsers = async () => {
    try {
        await sequelize.query("TRUNCATE users CASCADE");
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

const deleteSelectedUsers = async () => {
    try {
        await sequelize.query(
            "DELETE FROM users WHERE username != 'userforlogin'"
        );
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

const createUserDoctor = async () => {
    const { username, password, userType, ...DoctorData } = data.userForLogin;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const result = await sequelize.transaction(async (t) => {
        const user = await User.create(
            {
                username,
                password: passwordHash,
                userType,
            },
            { transaction: t }
        );

        const details = await Doctor.create(
            {
                ...DoctorData,
                userId: user.id,
            },
            { transaction: t }
        );

        const userPlain = user.toJSON();
        const detailsPlain = details.toJSON();

        userPlain.details = detailsPlain;

        return userPlain;
    });

    return result;
};

module.exports = {
    usersInDb,
    truncateAndCascadeUsers,
    deleteSelectedUsers,
    createUserDoctor,
};
