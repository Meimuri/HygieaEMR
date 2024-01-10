// Internal modules
const {
    createDoctorUserSchema,
    updateDoctorUserSchema,
} = require("./doctorUser");
const {
    createSecretaryUserSchema,
    updateSecretaryUserSchema,
} = require("./secretaryUser");

module.exports = {
    createDoctorUserSchema,
    createSecretaryUserSchema,
    updateDoctorUserSchema,
    updateSecretaryUserSchema,
};
