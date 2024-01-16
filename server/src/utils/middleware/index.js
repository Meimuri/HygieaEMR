// Internal modules
const unknownEndpoint = require("./api/unknown_endpoint");
const errorHandler = require("./api/error_handler");
const locationFinder = require("./miscellaneous/location/location_finder");
const userFinder = require("./user/user_finder");
const patientFinder = require("./patient/patient_finder");
const encounterFinder = require("./encounter/encounter_finder");

const {
    validateCreateLocation,
    validateUpdateLocation,
} = require("./miscellaneous/location/location_validator");

const {
    validateCreateUser,
    validateUpdateUser,
} = require("./user/user_validator");

const {
    validateCreatePatient,
    validateUpdatePatient,
} = require("./patient/patient_validator");

const {
    validateCreateEncounter,
    validateUpdateEncounter,
} = require("./encounter/encounter_validator");

module.exports = {
    unknownEndpoint,
    errorHandler,
    locationFinder,
    userFinder,
    patientFinder,
    encounterFinder,
    validateCreateLocation,
    validateUpdateLocation,
    validateCreateUser,
    validateUpdateUser,
    validateCreatePatient,
    validateUpdatePatient,
    validateCreateEncounter,
    validateUpdateEncounter,
};
