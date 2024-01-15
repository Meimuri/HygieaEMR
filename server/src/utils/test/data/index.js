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
    nonExistentPatientId,
} = require("./patient/patient_data");

module.exports = {
    validSecretaryUser,
    validDoctorUser,
    validSecretaryUserUpdate,
    validDoctorUserUpdate,
    invalidSecretaryUsers,
    invalidDoctorUsers,
    nonExistentUserId,
    validPatient,
    validPatientUpdate,
    nonExistentPatientId,
};
