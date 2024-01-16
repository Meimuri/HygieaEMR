// Internal modules
const {
    createLocationSchema,
    updateLocationSchema,
} = require("./miscellaneous/location");

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
    createLocationSchema,
    updateLocationSchema,
    createDoctorUserSchema,
    createSecretaryUserSchema,
    updateDoctorUserSchema,
    updateSecretaryUserSchema,
    createPatientSchema,
    updatePatientSchema,
    createEncounterSchema,
    updateEncounterSchema,
};
