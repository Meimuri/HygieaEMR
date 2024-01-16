// Internal modules
const {
    createDoctorUserSchema,
    updateDoctorUserSchema,
} = require("./user/doctor");

const {
    createSecretaryUserSchema,
    updateSecretaryUserSchema,
} = require("./user/secretary");

const {
    createPatientSchema,
    updatePatientSchema,
} = require("./patient/patient");

const {
    createEncounterSchema,
    updateEncounterSchema,
} = require("./encounter/encounter");

module.exports = {
    createDoctorUserSchema,
    createSecretaryUserSchema,
    updateDoctorUserSchema,
    updateSecretaryUserSchema,
    createPatientSchema,
    updatePatientSchema,
    createEncounterSchema,
    updateEncounterSchema,
};
