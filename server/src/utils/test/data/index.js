const {
    validLocation,
    validLocationUpdate,
    nonExistentLocationId,
} = require("./location/location_data");

const {
    validSecretaryUser,
    validDoctorUser,
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

module.exports = {
    validLocation,
    validLocationUpdate,
    nonExistentLocationId,
    validSecretaryUser,
    validDoctorUser,
    validSecretaryUserUpdate,
    validDoctorUserUpdate,
    invalidSecretaryUsers,
    invalidDoctorUsers,
    nonExistentUserId,
    validPatient,
    validPatientUpdate,
    invalidPatient,
    nonExistentPatientId,
};
