// Internal modules
const User = require("./user");
const Secretary = require("./secretary");
const Doctor = require("./doctor");

User.hasOne(Secretary);
User.hasOne(Doctor, { onDelete: "CASCADE" });

Secretary.belongsTo(User);
Doctor.belongsTo(User);

module.exports = {
    User,
    Secretary,
    Doctor,
};
