const supertest = require("supertest");
const app = require("../../index");
const api = supertest(app);
const helper = require("../../utils/test/helper/encounter_helper");
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

describe("GET /api/encounters", () => {
    test("should return a 200 status and encounters as json", async () => {
        const patientId = 1;
        const response = await api
            .get(`/api/encounters?patientId=${patientId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
    });

    test("should return a 404 status for non-existent encounters", async () => {
        const response = await api
            .get(`/api/encounters/${data.nonExistentEncounterId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toContain("Encounter not found");
    });
});

describe("POST /api/encounters", () => {
    const testEncounterCreation = async (
        patientData,
        locationData,
        encounterData
    ) => {
        await helper.truncateAndCascadePatients();
        const encountersAtStart = await helper.encountersInDb();

        await api
            .post("/api/patients")
            .set("Authorization", `Bearer ${token}`)
            .send(patientData);

        await api
            .post("/api/locations")
            .set("Authorization", `Bearer ${token}`)
            .send(locationData);

        const response = await api
            .post("/api/encounters")
            .set("Authorization", `Bearer ${token}`)
            .send(encounterData);

        expect(response.status).toBe(201);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );

        const encountersAtEnd = await helper.encountersInDb();

        expect(encountersAtEnd).toHaveLength(encountersAtStart.length + 1);
        expect(response.body.date).toBe(encounterData.date);
    };

    test("should return a 201 status and create a new encounters", async () => {
        await testEncounterCreation(
            data.validPatient,
            data.validLocation,
            data.validEncounter
        );
    });
});

describe("GET /api/encounters/:id", () => {
    test("should return a 200 status and the selected encounters", async () => {
        const encountersAtStart = await helper.encountersInDb();
        const encounterToView = encountersAtStart[0];

        const response = await api
            .get(`/api/encounters/${encounterToView.id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.class).toEqual(encounterToView.class);
    });
});

describe("PUT /api/encounters/:id ", () => {
    const testEncounterUpdate = async (
        locationData,
        patientData,
        encounterCreateData,
        encounterUpdateData
    ) => {
        await helper.truncateAndCascadePatients();

        await api
            .post("/api/locations")
            .set("Authorization", `Bearer ${token}`)
            .send(locationData);

        await api
            .post("/api/patients")
            .set("Authorization", `Bearer ${token}`)
            .send(patientData);

        const encounterToUpdate = await api
            .post("/api/encounters")
            .set("Authorization", `Bearer ${token}`)
            .send(encounterCreateData);

        const response = await api
            .put(`/api/encounters/${encounterToUpdate.body.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(encounterUpdateData);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.date).toBe(encounterUpdateData.date);
    };

    test("should return a 200 status and update the encounter's data", async () => {
        await testEncounterUpdate(
            data.validLocation,
            data.validPatient,
            data.validEncounter,
            data.validEncounterUpdate
        );
    });
});
