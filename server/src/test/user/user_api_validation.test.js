const {
    createSecretaryUserSchema,
    createDoctorUserSchema,
    updateSecretaryUserSchema,
    updateDoctorUserSchema,
} = require("../../utils/schema");
const data = require("../../utils/test/data");

function generateTest(schema, validUser, invalidUsers, missingFields) {
    test("should validate a correct user", () => {
        const result = schema.validate(validUser);
        expect(result.error).toBeUndefined();
    });

    Object.keys(invalidUsers).forEach((field) => {
        test(`should invalidate a user with an invalid ${field}`, () => {
            const user = {
                ...validUser,
                ...invalidUsers[field],
            };
            const result = schema.validate(user);
            expect(result.error).toBeDefined();
        });
    });

    missingFields.forEach((field) => {
        test(`should invalidate a user with a missing ${field}`, () => {
            const user = { ...validUser };
            delete user[field];
            const result = schema.validate(user);
            expect(result.error).toBeDefined();
        });
    });
}

const generateSchemaTests = (
    schemaName,
    createSchema,
    updateSchema,
    validUser,
    validUserUpdate,
    invalidUsers,
    createMissingFields,
    updateMissingFields
) => {
    describe(`${schemaName} User Schema`, () => {
        describe(`Create ${schemaName} User Schema`, () => {
            generateTest(
                createSchema,
                validUser,
                invalidUsers,
                createMissingFields
            );
        });

        describe(`Update ${schemaName} User Schema`, () => {
            generateTest(
                updateSchema,
                validUserUpdate,
                invalidUsers,
                updateMissingFields
            );
        });
    });
};

generateSchemaTests(
    "Secretary",
    createSecretaryUserSchema,
    updateSecretaryUserSchema,
    data.validSecretaryUser,
    data.validSecretaryUserUpdate,
    data.invalidSecretaryUsers,
    ["username", "password", "userType"],
    ["userType"]
);

generateSchemaTests(
    "Doctor",
    createDoctorUserSchema,
    updateDoctorUserSchema,
    data.validDoctorUser,
    data.validDoctorUserUpdate,
    data.invalidDoctorUsers,
    ["username", "password", "userType", "gender", "firstName"],
    ["userType", "gender", "firstName"]
);
