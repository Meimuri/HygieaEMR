const supertest = require("supertest");
const app = require("../../index");
const api = supertest(app);
const helper = require("../../utils/test/helper/encounter_helper");
const data = require("../../utils/test/data");

describe("GET /api/encounters", () => {
    test("should return a 200 status and encounters as json", async () => {
        const response = await api.get("/api/encounters");

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
    });

    test("should return a 404 status for non-existent encounters", async () => {
        const response = await api.get(
            `/api/encounters/${data.nonExistentEncounterId}`
        );

        expect(response.status).toBe(404);
        expect(response.body.error).toContain("Encounter not found");
    });
});

describe("POST /api/encounters", () => {
    const testEncounterCreation = async (
        userData,
        patientData,
        locationData,
        encounterData
    ) => {
        const encountersAtStart = await helper.encountersInDb();

        await api.post("/api/users").send(userData);
        await api.post("/api/patients").send(patientData);
        await api.post("/api/locations").send(locationData);

        const response = await api.post("/api/encounters").send(encounterData);

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
            data.validDoctorUserForEncounter,
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

        const response = await api.get(`/api/encounters/${encounterToView.id}`);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.class).toEqual(encounterToView.class);
    });
});

describe("PUT /api/encounters/:id ", () => {
    const testEncounterUpdate = async (encounterIndex, encounterData) => {
        const encountersAtStart = await helper.encountersInDb();
        const encounterToUpdate = encountersAtStart[encounterIndex];

        const response = await api
            .put(`/api/encounters/${encounterToUpdate.id}`)
            .send(encounterData);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.date).toBe(encounterData.date);
    };

    test("should return a 200 status and update the encounter's data", async () => {
        await testEncounterUpdate(0, data.validEncounterUpdate);
    });
});
