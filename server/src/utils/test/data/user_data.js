const validUser = {
    username: "testuser",
    password: "password123",
};

const validUsername = "validusername";

const invalidUsers = {
    username: {
        username: 123,
        username2: "",
        username3: " ",
        username4: "a".repeat(101),
    },
    password: {
        password: "12",
        password2: 123,
        password3: "",
        password4: " ",
        password5: "a".repeat(101),
    },
};

const nonExistentUserId = "21";

module.exports = {
    validUser,
    validUsername,
    invalidUsers,
    nonExistentUserId,
};
