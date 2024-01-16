const {
    createExaminationSchema,
    updateExaminationSchema,
} = require("../../utils/schema");
const data = require("../../utils/test/data");

function generateTest(
    schema,
    validExamination,
    invalidExamination,
    missingFields
) {
    test("should validate a correct examination", () => {
        const result = schema.validate(validExamination);
        expect(result.error).toBeUndefined();
    });

    Object.keys(invalidExamination).forEach((objectKey) => {
        Object.keys(invalidExamination[objectKey]).forEach((field) => {
            test(`should invalidate a examination with an invalid ${objectKey}.${field}`, () => {
                const examination = {
                    ...validExamination,
                    [objectKey]: {
                        ...validExamination[objectKey],
                        ...invalidExamination[objectKey][field],
                    },
                };
                const result = schema.validate(examination);
                expect(result.error).toBeDefined();
            });
        });
    });

    missingFields.forEach((field) => {
        test(`should invalidate a examination with a missing ${field}`, () => {
            const examination = { ...validExamination };
            const fieldParts = field.split(".");
            if (fieldParts.length === 2) {
                delete examination[fieldParts[0]][fieldParts[1]];
            } else {
                delete examination[field];
            }
            const result = schema.validate(examination);
            expect(result.error).toBeDefined();
        });
    });
}

const generateSchemaTests = (
    schemaName,
    createSchema,
    updateSchema,
    validExamination,
    validExaminationUpdate,
    invalidExamination,
    createMissingFields,
    updateMissingFields
) => {
    describe(`${schemaName} Schema`, () => {
        describe(`Create ${schemaName} Schema`, () => {
            generateTest(
                createSchema,
                validExamination,
                invalidExamination,
                createMissingFields
            );
        });

        describe(`Update ${schemaName} Schema`, () => {
            generateTest(
                updateSchema,
                validExaminationUpdate,
                invalidExamination,
                updateMissingFields
            );
        });
    });
};

generateSchemaTests(
    "Examination",
    createExaminationSchema,
    updateExaminationSchema,
    data.validExamination,
    data.validExaminationUpdate,
    data.invalidExamination,
    ["encounterId", "locationId", "date"],
    ["encounterId", "locationId", "date"]
);
