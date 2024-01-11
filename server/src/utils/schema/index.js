// Internal modules
const {
    createDoctorUserSchema,
    updateDoctorUserSchema,
} = require("./user/doctor");
const {
    createSecretaryUserSchema,
    updateSecretaryUserSchema,
} = require("./user/secretary");

module.exports = {
    createDoctorUserSchema,
    createSecretaryUserSchema,
    updateDoctorUserSchema,
    updateSecretaryUserSchema,
};
