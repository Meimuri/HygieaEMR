const { User } = require("../../models");

const newUser = {
    username: "username",
    password: "password",
};

const userFields = [
    {
        name: "username",
        error: "Username is required and must be a string",
    },
    {
        name: "password",
        error: "Password is required, must be a string, and should have 3 or more characters",
    },
];

const updateUser = {
    username: "username",
};

const updateUserFields = [
    {
        name: "username",
        error: "Username is required and must be a string",
    },
];

const usersInDb = async () => {
    const users = await User.findAll();
    return users;
};

module.exports = {
    usersInDb,
    userFields,
    newUser,
    updateUserFields,
    updateUser,
};
