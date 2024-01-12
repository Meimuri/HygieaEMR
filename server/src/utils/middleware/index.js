// Internal modules
const unknownEndpoint = require("./api/unknown_endpoint");
const errorHandler = require("./api/error_handler");
const userFinder = require("./user/user_finder");
const {
    validateCreateUser,
    validateUpdateUser,
} = require("./user/user_validator");
const {
    validateCreatePatient,
    validateUpdatePatient,
} = require("./patient/patient_validator");

module.exports = {
    unknownEndpoint,
    errorHandler,
    userFinder,
    validateCreateUser,
    validateUpdateUser,
    validateCreatePatient,
    validateUpdatePatient,
};
