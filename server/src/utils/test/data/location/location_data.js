const validLocation = {
    code: "LOC123",
    name: "Main Branch",
    address1: "123 Main St",
    address2: "Suite 456",
    city: "Manila",
    province: "NCR",
    zipCode: 1000,
};

const validLocationUpdate = {
    code: "LOC123",
    name: "Main Branch",
    address1: "123 Main St",
    address2: "Suite 456",
    city: "Manila",
    province: "NCR",
    zipCode: 1000,
};

const invalidLocation = {
    code: {
        code1: 123,
        code2: "",
        code3: " ",
        code4: "a".repeat(101),
    },
    name: {
        name1: 123,
        name2: "",
        name3: " ",
        name4: "a".repeat(101),
    },
    address1: {
        address1_1: 123,
        address1_2: "a".repeat(101),
    },
    address2: {
        address2_1: 123,
        address2_2: "a".repeat(101),
    },
    city: {
        city1: 123,
        city2: "a".repeat(101),
    },
    province: {
        province1: 123,
        province2: "a".repeat(101),
    },
    zipCode: {
        zipCode1: "abc",
        zipCode2: 123.45,
    },
};

const nonExistentLocationId = "21";

module.exports = {
    validLocation,
    validLocationUpdate,
    invalidLocation,
    nonExistentLocationId,
};
