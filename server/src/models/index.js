// Internal modules
const Location = require("./miscellaneous/location");
const User = require("./user/user");
const Secretary = require("./user/secretary");
const Doctor = require("./user/doctor");

const Patient = require("./patient/patient");
const PatientAddress = require("./patient/patient_address");
const PatientContactInfo = require("./patient/patient_contact_info");
const PatientEmergencyContact = require("./patient/patient_emergency_contact");

const Encounter = require("./encounter/encounter");
const Examination = require("./examination/examination");

User.hasOne(Secretary);
User.hasOne(Doctor);

Secretary.belongsTo(User);
Doctor.belongsTo(User);

Patient.hasOne(PatientAddress);
PatientAddress.belongsTo(Patient);

Patient.hasOne(PatientContactInfo);
PatientContactInfo.belongsTo(Patient);

Patient.hasOne(PatientEmergencyContact);
PatientEmergencyContact.belongsTo(Patient);

Patient.hasMany(Encounter);
Encounter.belongsTo(Patient);

Encounter.belongsTo(Location);
Encounter.belongsTo(Doctor);

Encounter.hasMany(Examination);
Examination.belongsTo(Encounter);
Examination.belongsTo(Location);

module.exports = {
    Location,
    User,
    Secretary,
    Doctor,
    Patient,
    PatientAddress,
    PatientContactInfo,
    PatientEmergencyContact,
    Encounter,
    Examination,
};
