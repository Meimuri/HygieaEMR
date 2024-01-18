// Internal modules
const unknownEndpoint = require("./api/unknown_endpoint");
const errorHandler = require("./api/error_handler");
const tokenExtractor = require("./api/token_extractor");
const userExtractor = require("./api/user_extractor");
const laboratoryFinder = require("./miscellaneous/laboratory/laboratory_finder");
const locationFinder = require("./miscellaneous/location/location_finder");
const userFinder = require("./user/user_finder");
const patientFinder = require("./patient/patient_finder");
const encounterFinder = require("./encounter/encounter_finder");
const examinationFinder = require("./examination/examination_finder");

const { validateLogin } = require("./user/login_validator");

const {
    validateCreateLaboratory,
    validateUpdateLaboratory,
} = require("./miscellaneous/laboratory/laboratory_validator");

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

const {
    validateCreateExamination,
    validateUpdateExamination,
} = require("./examination/examination_validator");

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor,
    laboratoryFinder,
    locationFinder,
    userFinder,
    patientFinder,
    encounterFinder,
    examinationFinder,
    validateLogin,
    validateCreateLaboratory,
    validateUpdateLaboratory,
    validateCreateLocation,
    validateUpdateLocation,
    validateCreateUser,
    validateUpdateUser,
    validateCreatePatient,
    validateUpdatePatient,
    validateCreateEncounter,
    validateUpdateEncounter,
    validateCreateExamination,
    validateUpdateExamination,
};
