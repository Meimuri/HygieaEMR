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

const invalidPatient = {
    patientInfo: {
        firstName: {
            firstName1: 123,
            firstName2: "",
            firstName3: " ",
            firstName4: "a".repeat(101),
        },
        middleName: {
            middleName1: 123,
            middleName2: "",
            middleName3: " ",
            middleName4: "a".repeat(101),
        },
        lastName: {
            lastName1: 123,
            lastName2: "",
            lastName3: " ",
            lastName4: "a".repeat(101),
        },
        birthDate: {
            birthDate1: "abc",
            birthDate2: "",
            birthDate3: " ",
            birthDate4: "2022-13-01",
        },
        gender: {
            gender1: "abc",
            gender2: "",
            gender3: " ",
        },
        maritalStatus: {
            maritalStatus1: "abc",
            maritalStatus2: "",
            maritalStatus3: " ",
        },
        bloodType: {
            bloodType1: "abc",
            bloodType2: "",
            bloodType3: " ",
        },
        referrerName: {
            referrerName1: 123,
            referrerName2: "",
            referrerName3: " ",
            referrerName4: "a".repeat(101),
        },
        notes: {
            notes1: 123,
            notes2: "",
            notes3: " ",
            notes4: "a".repeat(101),
        },
    },
    addressInfo: {
        address: {
            address1: 123,
            address2: "",
            address3: " ",
            address4: "a".repeat(101),
        },
        address2: {
            address21: 123,
            address22: "",
            address23: " ",
            address24: "a".repeat(101),
        },
        city: {
            city1: 123,
            city2: "",
            city3: " ",
            city4: "a".repeat(101),
        },
        province: {
            province1: 123,
            province2: "",
            province3: " ",
            province4: "a".repeat(101),
        },
        zipCode: {
            zipCode1: "abc",
            zipCode2: "",
            zipCode3: " ",
            zipCode4: "123.45",
        },
    },
    contactInfo: {
        homePhone: {
            homePhone1: 123,
            homePhone2: "",
            homePhone3: " ",
            homePhone4: "a".repeat(101),
        },
        workPhone: {
            workPhone1: 123,
            workPhone2: "",
            workPhone3: " ",
            workPhone4: "a".repeat(101),
        },
        mobilePhonePrimary: {
            mobilePhonePrimary1: 123,
            mobilePhonePrimary2: "",
            mobilePhonePrimary3: " ",
            mobilePhonePrimary4: "a".repeat(101),
        },
        mobilePhoneSecondary: {
            mobilePhoneSecondary1: 123,
            mobilePhoneSecondary2: "",
            mobilePhoneSecondary3: " ",
            mobilePhoneSecondary4: "a".repeat(101),
        },
        emailAddress: {
            emailAddress1: "abc",
            emailAddress2: "",
            emailAddress3: " ",
            emailAddress4: "a@b",
        },
    },
    emergencyContactInfo: {
        firstName: {
            firstName1: 123,
            firstName2: "",
            firstName3: " ",
            firstName4: "a".repeat(101),
        },
        lastName: {
            lastName1: 123,
            lastName2: "",
            lastName3: " ",
            lastName4: "a".repeat(101),
        },
        homePhone: {
            homePhone1: 123,
            homePhone2: "",
            homePhone3: " ",
            homePhone4: "a".repeat(101),
        },
        mobilePrimary: {
            mobilePrimary1: 123,
            mobilePrimary2: "",
            mobilePrimary3: " ",
            mobilePrimary4: "a".repeat(101),
        },
        relationship: {
            relationship1: 123,
            relationship2: "",
            relationship3: " ",
            relationship4: "a".repeat(101),
        },
    },
};

const nonExistentPatientId = "21";

module.exports = {
    validPatient,
    validPatientUpdate,
    invalidPatient,
    nonExistentPatientId,
};
