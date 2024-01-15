const supertest = require("supertest");
const app = require("../../index");
const api = supertest(app);
const helper = require("../../utils/test/helper/patient_helper");
const data = require("../../utils/test/data");

describe("GET /api/patients", () => {
    test("should return a 200 status and patients as json", async () => {
        const response = await api.get("/api/patients");

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
    });

    test("should return a 200 status and have zero patients", async () => {
        const response = await api.get("/api/patients");

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(0);
    });

    test("should return a 404 status for non-existent patients", async () => {
        const response = await api.get(
            `/api/patients/${data.nonExistentPatientId}`
        );

        expect(response.status).toBe(404);
        expect(response.body.error).toContain("Patient not found");
    });
});

describe("POST /api/patients", () => {
    const testPatientCreation = async (patientData) => {
        const patientsAtStart = await helper.patientsInDb();

        const response = await api.post("/api/patients").send(patientData);

        expect(response.status).toBe(201);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );

        const patientsAtEnd = await helper.patientsInDb();

        expect(patientsAtEnd).toHaveLength(patientsAtStart.length + 1);
        expect(response.body.firstName).toBe(patientData.firstName);
    };

    test("should return a 201 status and create a new patient", async () => {
        await testPatientCreation(data.validPatient);
    });
});

describe("GET /api/patients/:id", () => {
    test("should return a 200 status and the selected patient", async () => {
        const patientsAtStart = await helper.patientsInDb();
        const patientToView = patientsAtStart[0];

        const response = await api.get(`/api/patients/${patientToView.id}`);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.firstName).toEqual(patientToView.firstName);
    });
});
