const {
    createLaboratorySchema,
    updateLaboratorySchema,
} = require("../../utils/schema");
const data = require("../../utils/test/data");

function generateTest(
    schema,
    validLaboratory,
    invalidLaboratory,
    missingFields
) {
    test("should validate a correct laboratory", () => {
        const result = schema.validate(validLaboratory);
        expect(result.error).toBeUndefined();
    });

    Object.keys(invalidLaboratory).forEach((objectKey) => {
        Object.keys(invalidLaboratory[objectKey]).forEach((field) => {
            test(`should invalidate a laboratory with an invalid ${objectKey}.${field}`, () => {
                const laboratory = {
                    ...validLaboratory,
                    [objectKey]: {
                        ...validLaboratory[objectKey],
                        ...invalidLaboratory[objectKey][field],
                    },
                };
                const result = schema.validate(laboratory);
                expect(result.error).toBeDefined();
            });
        });
    });

    missingFields.forEach((field) => {
        test(`should invalidate a laboratory with a missing ${field}`, () => {
            const laboratory = { ...validLaboratory };
            const fieldParts = field.split(".");
            if (fieldParts.length === 2) {
                delete laboratory[fieldParts[0]][fieldParts[1]];
            } else {
                delete laboratory[field];
            }
            const result = schema.validate(laboratory);
            expect(result.error).toBeDefined();
        });
    });
}

const generateSchemaTests = (
    schemaName,
    createSchema,
    updateSchema,
    validLaboratory,
    validLaboratoryUpdate,
    invalidLaboratory,
    createMissingFields,
    updateMissingFields
) => {
    describe(`${schemaName} Schema`, () => {
        describe(`Create ${schemaName} Schema`, () => {
            generateTest(
                createSchema,
                validLaboratory,
                invalidLaboratory,
                createMissingFields
            );
        });

        describe(`Update ${schemaName} Schema`, () => {
            generateTest(
                updateSchema,
                validLaboratoryUpdate,
                invalidLaboratory,
                updateMissingFields
            );
        });
    });
};

generateSchemaTests(
    "Laboratory",
    createLaboratorySchema,
    updateLaboratorySchema,
    data.validLaboratory,
    data.validLaboratoryUpdate,
    data.invalidLaboratory,
    ["name"],
    ["name"]
);
