const { createUserSchema, updateUserSchema } = require("../utils/schema/");
const data = require("../utils/test/data");

function generateTests(schema, validUser, invalidUsers, missingFields) {
    // Add "test.concurrent.each(Array(100).fill(null))" best test to run it multiple times

    test("should validate a correct user", () => {
        const result = schema.validate(validUser);
        expect(result.error).toBeUndefined();
    });

    Object.keys(invalidUsers).forEach((field) => {
        test(`should invalidate a user with an invalid ${field}`, () => {
            const user = { ...validUser, ...invalidUsers[field] };
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

describe("User Schema", () => {
    describe("Create User Schema", () => {
        const missingFields = ["username", "password"]; // required fields

        generateTests(
            createUserSchema,
            data.validUser,
            data.invalidUsers,
            missingFields
        );
    });

    describe("Update User Schema", () => {
        const missingFields = ["username"]; // required fields

        generateTests(
            updateUserSchema,
            data.validUser,
            data.invalidUsers,
            missingFields
        );
    });
});
