const { User } = require("../../models");

const usersInDb = async () => {
    const users = await User.findAll();
    return users;
};

module.exports = {
    usersInDb,
};
