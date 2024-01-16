const {
    createEncounterSchema,
    updateEncounterSchema,
} = require("../../utils/schema");
const data = require("../../utils/test/data");

function generateTest(schema, validEncounter, invalidEncounter, missingFields) {
    test("should validate a correct encounter", () => {
        const result = schema.validate(validEncounter);
        expect(result.error).toBeUndefined();
    });

    Object.keys(invalidEncounter).forEach((objectKey) => {
        Object.keys(invalidEncounter[objectKey]).forEach((field) => {
            test(`should invalidate a encounter with an invalid ${objectKey}.${field}`, () => {
                const encounter = {
                    ...validEncounter,
                    [objectKey]: {
                        ...validEncounter[objectKey],
                        ...invalidEncounter[objectKey][field],
                    },
                };
                const result = schema.validate(encounter);
                expect(result.error).toBeDefined();
            });
        });
    });

    missingFields.forEach((field) => {
        test(`should invalidate a encounter with a missing ${field}`, () => {
            const encounter = { ...validEncounter };
            const fieldParts = field.split(".");
            if (fieldParts.length === 2) {
                delete encounter[fieldParts[0]][fieldParts[1]];
            } else {
                delete encounter[field];
            }
            const result = schema.validate(encounter);
            expect(result.error).toBeDefined();
        });
    });
}

const generateSchemaTests = (
    schemaName,
    createSchema,
    updateSchema,
    validEncounter,
    validEncounterUpdate,
    invalidEncounter,
    createMissingFields,
    updateMissingFields
) => {
    describe(`${schemaName} Schema`, () => {
        describe(`Create ${schemaName} Schema`, () => {
            generateTest(
                createSchema,
                validEncounter,
                invalidEncounter,
                createMissingFields
            );
        });

        describe(`Update ${schemaName} Schema`, () => {
            generateTest(
                updateSchema,
                validEncounterUpdate,
                invalidEncounter,
                updateMissingFields
            );
        });
    });
};

generateSchemaTests(
    "Encounter",
    createEncounterSchema,
    updateEncounterSchema,
    data.validEncounter,
    data.validEncounterUpdate,
    data.invalidEncounter,
    ["patientId", "date", "class", "status", "locationId"],
    ["patientId", "date", "class", "status", "locationId"]
);
