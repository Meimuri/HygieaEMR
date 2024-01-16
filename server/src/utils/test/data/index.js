const {
    validLaboratory,
    validLaboratoryUpdate,
    invalidLaboratory,
    nonExistentLaboratoryId,
} = require("./laboratory/laboratory_data");

const {
    validLocation,
    validLocationUpdate,
    invalidLocation,
    nonExistentLocationId,
} = require("./location/location_data");

const {
    validSecretaryUser,
    validSecretaryUserForUpdate,
    validDoctorUser,
    validDoctorUserForUpdate,
    validDoctorUserForEncounter,
    validSecretaryUserUpdate,
    validDoctorUserUpdate,
    invalidSecretaryUsers,
    invalidDoctorUsers,
    nonExistentUserId,
} = require("./user/user_data");

const {
    validPatient,
    validPatientUpdate,
    invalidPatient,
    nonExistentPatientId,
} = require("./patient/patient_data");

const {
    validEncounter,
    validEncounterUpdate,
    invalidEncounter,
    nonExistentEncounterId,
} = require("./encounter/encounter_data");

const {
    validExamination,
    validExaminationUpdate,
    invalidExamination,
    nonExistentExaminationId,
} = require("./examination/examination_data");

module.exports = {
    validLaboratory,
    validLaboratoryUpdate,
    invalidLaboratory,
    nonExistentLaboratoryId,
    validLocation,
    validLocationUpdate,
    invalidLocation,
    nonExistentLocationId,
    validSecretaryUser,
    validSecretaryUserForUpdate,
    validDoctorUser,
    validDoctorUserForUpdate,
    validDoctorUserForEncounter,
    validSecretaryUserUpdate,
    validDoctorUserUpdate,
    invalidSecretaryUsers,
    invalidDoctorUsers,
    nonExistentUserId,
    validPatient,
    validPatientUpdate,
    invalidPatient,
    nonExistentPatientId,
    validEncounter,
    validEncounterUpdate,
    invalidEncounter,
    nonExistentEncounterId,
    validExamination,
    validExaminationUpdate,
    invalidExamination,
    nonExistentExaminationId,
};
