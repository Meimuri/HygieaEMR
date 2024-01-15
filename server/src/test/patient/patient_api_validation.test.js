const {
    createPatientSchema,
    updatePatientSchema,
} = require("../../utils/schema");
const data = require("../../utils/test/data");

function generateTest(schema, validPatient, invalidPatient, missingFields) {
    test("should validate a correct patient", () => {
        const result = schema.validate(validPatient);
        expect(result.error).toBeUndefined();
    });

    Object.keys(invalidPatient).forEach((objectKey) => {
        Object.keys(invalidPatient[objectKey]).forEach((field) => {
            test(`should invalidate a patient with an invalid ${objectKey}.${field}`, () => {
                const patient = {
                    ...validPatient,
                    [objectKey]: {
                        ...validPatient[objectKey],
                        ...invalidPatient[objectKey][field],
                    },
                };
                const result = schema.validate(patient);
                expect(result.error).toBeDefined();
            });
        });
    });

    missingFields.forEach((field) => {
        test(`should invalidate a patient with a missing ${field}`, () => {
            const patient = { ...validPatient };
            const fieldParts = field.split(".");
            if (fieldParts.length === 2) {
                delete patient[fieldParts[0]][fieldParts[1]];
            } else {
                delete patient[field];
            }
            const result = schema.validate(patient);
            expect(result.error).toBeDefined();
        });
    });
}

const generateSchemaTests = (
    schemaName,
    createSchema,
    updateSchema,
    validPatient,
    validPatientUpdate,
    invalidPatient,
    createMissingFields,
    updateMissingFields
) => {
    describe(`${schemaName} Schema`, () => {
        describe(`Create ${schemaName} Schema`, () => {
            generateTest(
                createSchema,
                validPatient,
                invalidPatient,
                createMissingFields
            );
        });

        describe(`Update ${schemaName} Schema`, () => {
            generateTest(
                updateSchema,
                validPatientUpdate,
                invalidPatient,
                updateMissingFields
            );
        });
    });
};

generateSchemaTests(
    "Patient",
    createPatientSchema,
    updatePatientSchema,
    data.validPatient,
    data.validPatientUpdate,
    data.invalidPatient,
    [
        "patientInfo.firstName",
        "patientInfo.lastName",
        "patientInfo.birthDate",
        "patientInfo.gender",
        "patientInfo.maritalStatus",
        "patientInfo.bloodType",
        "addressInfo.zipCode",
    ],
    [
        "patientInfo.firstName",
        "patientInfo.lastName",
        "patientInfo.birthDate",
        "patientInfo.gender",
        "patientInfo.maritalStatus",
        "patientInfo.bloodType",
        "addressInfo.zipCode",
    ]
);
