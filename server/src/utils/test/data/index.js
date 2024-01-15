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
    // validDoctorUser,
    // validSecretaryUserUpdate,
    // validDoctorUserUpdate,
    // invalidSecretaryUsers,
    // invalidDoctorUsers,
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
    nonExistentPatientId,
};
