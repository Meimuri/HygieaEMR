// Internal modules
const User = require("./user/user");
const Secretary = require("./user/secretary");
const Doctor = require("./user/doctor");

User.hasOne(Secretary);
User.hasOne(Doctor, { onDelete: "CASCADE" });

Secretary.belongsTo(User);
Doctor.belongsTo(User);

module.exports = {
    User,
    Secretary,
    Doctor,
};
