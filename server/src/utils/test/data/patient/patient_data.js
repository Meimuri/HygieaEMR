const validPatient = {
    patientInfo: {
        firstName: "Juan",
        middleName: "Dela",
        lastName: "Cruz",
        birthDate: "1980-05-15",
        gender: "Male",
        maritalStatus: "Married",
        bloodType: "O+",
        referrerName: "Dr. Maria Santos",
        notes: "Patient has a history of hypertension.",
    },
    addressInfo: {
        address: "123 Rizal St",
        address2: "Barangay 678",
        city: "Manila",
        province: "Metro Manila",
        zipCode: 1000,
    },
    contactInfo: {
        homePhone: "(02) 123-4567",
        workPhone: "(02) 890-1234",
        mobilePhonePrimary: "09171234567",
        mobilePhoneSecondary: "09281234567",
        emailAddress: "juan.delacruz@example.com",
    },
    emergencyContactInfo: {
        firstName: "Maria",
        lastName: "Santos",
        homePhone: "(02) 890-1234",
        mobilePrimary: "09181234567",
        relationship: "Doctor",
    },
};

const validPatientUpdate = {
    patientInfo: {
        firstName: "Pedro",
        middleName: "Mendoza",
        lastName: "Santos",
        birthDate: "1975-10-20",
        gender: "Male",
        maritalStatus: "Single",
        bloodType: "A+",
        referrerName: "Dr. Jose Rizal",
        notes: "Patient is diabetic.",
    },
    addressInfo: {
        address: "4567 Bonifacio Ave",
        address2: "Barangay 123",
        city: "Quezon City",
        province: "Metro Manila",
        zipCode: 1100,
    },
    contactInfo: {
        homePhone: "(02) 234-5678",
        workPhone: "(02) 345-6789",
        mobilePhonePrimary: "09181234567",
        mobilePhoneSecondary: "09291234567",
        emailAddress: "pedro.santos@example.com",
    },
    emergencyContactInfo: {
        firstName: "Jose",
        lastName: "Rizal",
        homePhone: "(02) 345-6789",
        mobilePrimary: "09191234567",
        relationship: "Doctor",
    },
};

const nonExistentPatientId = "21";

module.exports = {
    validPatient,
    validPatientUpdate,
    nonExistentPatientId,
};
