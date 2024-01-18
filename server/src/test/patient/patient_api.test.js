const supertest = require("supertest");
const app = require("../../index");
const api = supertest(app);
const helper = require("../../utils/test/helper/patient_helper");
const userHelper = require("../../utils/test/helper/user_helper");
const data = require("../../utils/test/data");

let token = "";

beforeAll(async () => {
    await userHelper.truncateAndCascadeUsers();
    await userHelper.createUserDoctor();

    const user = {
        username: "userforlogin",
        password: "Qweasd!2",
    };

    const response = await api.post("/api/login").send(user);
    token = response.body.token;
}, 100000);

describe("GET /api/patients", () => {
    test("should return a 200 status and patients as json", async () => {
        const response = await api
            .get("/api/patients")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
    });

    test("should return a 404 status for non-existent patients", async () => {
        const response = await api
            .get(`/api/patients/${data.nonExistentPatientId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toContain("Patient not found");
    });
});

describe("POST /api/patients", () => {
    const testPatientCreation = async (patientData) => {
        await helper.deleteSelectedPatients();
        const patientsAtStart = await helper.patientsInDb();

        const response = await api
            .post("/api/patients")
            .set("Authorization", `Bearer ${token}`)
            .send(patientData);

        expect(response.status).toBe(201);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );

        const patientsAtEnd = await helper.patientsInDb();

        expect(patientsAtEnd).toHaveLength(patientsAtStart.length + 1);
        expect(response.body.firstName).toBe(patientData.patientInfo.firstName);
    };

    test("should return a 201 status and create a new patient", async () => {
        await testPatientCreation(data.validPatient);
    });
});

describe("GET /api/patients/:id", () => {
    test("should return a 200 status and the selected patient", async () => {
        const patientsAtStart = await helper.patientsInDb();
        const patientToView = patientsAtStart[0];

        const response = await api
            .get(`/api/patients/${patientToView.id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.firstName).toEqual(patientToView.firstName);
    });
});

describe("PUT /api/patients/:id ", () => {
    const testPatientUpdate = async (patientCreateData, patientUpdateData) => {
        await helper.deleteSelectedPatients();
        const patientToUpdate = await api
            .post("/api/patients")
            .set("Authorization", `Bearer ${token}`)
            .send(patientCreateData);

        const response = await api
            .put(`/api/patients/${patientToUpdate.body.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(patientUpdateData);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.firstName).toBe(
            patientUpdateData.patientInfo.firstName
        );
    };

    test("should return a 200 status and update the patients's data", async () => {
        await testPatientUpdate(data.validPatient, data.validPatientUpdate);
    });
});
