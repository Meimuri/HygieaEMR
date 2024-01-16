const {
    createLocationSchema,
    updateLocationSchema,
} = require("../../utils/schema");
const data = require("../../utils/test/data");

function generateTest(schema, validLocation, invalidLocation, missingFields) {
    test("should validate a correct location", () => {
        const result = schema.validate(validLocation);
        expect(result.error).toBeUndefined();
    });

    Object.keys(invalidLocation).forEach((objectKey) => {
        Object.keys(invalidLocation[objectKey]).forEach((field) => {
            test(`should invalidate a location with an invalid ${objectKey}.${field}`, () => {
                const location = {
                    ...validLocation,
                    [objectKey]: {
                        ...validLocation[objectKey],
                        ...invalidLocation[objectKey][field],
                    },
                };
                const result = schema.validate(location);
                expect(result.error).toBeDefined();
            });
        });
    });

    missingFields.forEach((field) => {
        test(`should invalidate a location with a missing ${field}`, () => {
            const location = { ...validLocation };
            const fieldParts = field.split(".");
            if (fieldParts.length === 2) {
                delete location[fieldParts[0]][fieldParts[1]];
            } else {
                delete location[field];
            }
            const result = schema.validate(location);
            expect(result.error).toBeDefined();
        });
    });
}

const generateSchemaTests = (
    schemaName,
    createSchema,
    updateSchema,
    validLocation,
    validLocationUpdate,
    invalidLocation,
    createMissingFields,
    updateMissingFields
) => {
    describe(`${schemaName} Schema`, () => {
        describe(`Create ${schemaName} Schema`, () => {
            generateTest(
                createSchema,
                validLocation,
                invalidLocation,
                createMissingFields
            );
        });

        describe(`Update ${schemaName} Schema`, () => {
            generateTest(
                updateSchema,
                validLocationUpdate,
                invalidLocation,
                updateMissingFields
            );
        });
    });
};

generateSchemaTests(
    "Location",
    createLocationSchema,
    updateLocationSchema,
    data.validLocation,
    data.validLocationUpdate,
    data.invalidLocation,
    ["code", "name"],
    ["code", "name"]
);
