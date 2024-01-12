// Internal modules
const User = require("./user/user");
const Secretary = require("./user/secretary");
const Doctor = require("./user/doctor");

const Patient = require("./patient/patient");
const PatientAddress = require("./patient/patient_address");

User.hasOne(Secretary);
User.hasOne(Doctor);

Secretary.belongsTo(User);
Doctor.belongsTo(User);

Patient.hasOne(PatientAddress);
PatientAddress.belongsTo(Patient);

module.exports = {
    User,
    Secretary,
    Doctor,
    Patient,
    PatientAddress,
};
