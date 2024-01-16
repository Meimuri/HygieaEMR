const { User } = require("../../../models");

const usersInDb = async () => {
    const users = await User.findAll();
    return users;
};

const deleteAllUsers = async () => {
    await User.destroy({
        where: { id: [1, 2] },
    });
};

module.exports = {
    usersInDb,
    deleteAllUsers,
};
