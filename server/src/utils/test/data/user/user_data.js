const userForLogin = {
    username: "userforlogin",
    password: "Qweasd!2",
    userType: "Doctor",
    firstName: "John",
    gender: "Male",
};

const validSecretaryUser = {
    username: "validSecretaryUsername",
    password: "Qweasd!2",
    firstName: "Jane",
    lastName: "Smith",
    userType: "Secretary",
};

const validDoctorUser = {
    username: "validDoctorUsername",
    password: "Qweasd!2",
    userType: "Doctor",
    firstName: "John",
    middleName: "Doe",
    lastName: "Smith",
    gender: "Male",
    specialization: "Cardiology",
    licenseNo: "123456",
    ptrNo: "789012",
    s2No: "345678",
};

const validSecretaryUserUpdate = {
    firstName: "Jarvis",
    userType: "Secretary",
};

const validDoctorUserUpdate = {
    firstName: "Jarvis",
    gender: "Male",
    userType: "Doctor",
};

const invalidSecretaryUsers = {
    username: {
        username1: 123,
        username2: "",
        username3: " ",
        username4: "a".repeat(101),
    },
    password: {
        password1: "12",
        password2: 123,
        password3: "",
        password4: " ",
        password5: "a".repeat(101),
    },
    userType: {
        userType1: "Engineer",
        userType2: "",
        userType3: " ",
    },
    firstName: {
        firstName1: "a",
        firstName2: 123,
        firstName3: "",
        firstName4: " ",
        firstName5: "a".repeat(101),
    },
    lastName: {
        lastName1: "a",
        lastName2: 123,
        lastName3: "",
        lastName4: " ",
        lastName5: "a".repeat(101),
    },
};

const invalidDoctorUsers = {
    username: {
        username1: 123,
        username2: "",
        username3: " ",
        username4: "a".repeat(101),
    },
    password: {
        password1: "12",
        password2: 123,
        password3: "",
        password4: " ",
        password5: "a".repeat(101),
    },
    userType: {
        userType1: "Engineer",
        userType2: "",
        userType3: " ",
    },
    firstName: {
        firstName1: "a",
        firstName2: 123,
        firstName3: "",
        firstName4: " ",
        firstName5: "a".repeat(101),
    },
    middleName: {
        middleName1: "a",
        middleName2: 123,
        middleName3: "",
        middleName4: " ",
        middleName5: "a".repeat(101),
    },
    lastName: {
        lastName1: "a",
        lastName2: 123,
        lastName3: "",
        lastName4: " ",
        lastName5: "a".repeat(101),
    },
    gender: {
        gender1: "Other",
        gender2: "",
        gender3: " ",
    },
    specialization: {
        specialization1: "a",
        specialization2: 123,
        specialization3: "",
        specialization4: " ",
        specialization5: "a".repeat(101),
    },
    licenseNo: {
        licenseNo1: "a",
        licenseNo2: 123,
        licenseNo3: "",
        licenseNo4: " ",
        licenseNo5: "a".repeat(101),
    },
    ptrNo: {
        ptrNo1: "a",
        ptrNo2: 123,
        ptrNo3: "",
        ptrNo4: " ",
        ptrNo5: "a".repeat(101),
    },
    s2No: {
        s2No1: "a",
        s2No2: 123,
        s2No3: "",
        s2No4: " ",
        s2No5: "a".repeat(101),
    },
};

const nonExistentUserId = "21";

module.exports = {
    userForLogin,
    validSecretaryUser,
    validDoctorUser,
    validSecretaryUserUpdate,
    validDoctorUserUpdate,
    invalidSecretaryUsers,
    invalidDoctorUsers,
    nonExistentUserId,
};
