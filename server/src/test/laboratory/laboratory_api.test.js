const supertest = require("supertest");
const app = require("../../index");
const api = supertest(app);
const helper = require("../../utils/test/helper/laboratory_helper");
const data = require("../../utils/test/data");

describe("GET /api/laboratories", () => {
    test("should return a 200 status and laboratories as json", async () => {
        const response = await api.get("/api/laboratories");

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
    });

    test("should return a 404 status for non-existent laboratories", async () => {
        const response = await api.get(
            `/api/laboratories/${data.nonExistentLaboratoryId}`
        );

        expect(response.status).toBe(404);
        expect(response.body.error).toContain("Laboratory not found");
    });
});

describe("POST /api/laboratories", () => {
    const testLaboratoryCreation = async (laboratoryData) => {
        const laboratoriesAtStart = await helper.laboratoryInDb();

        const response = await api
            .post("/api/laboratories")
            .send(laboratoryData);

        expect(response.status).toBe(201);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );

        const laboratoriesAtEnd = await helper.laboratoryInDb();

        expect(laboratoriesAtEnd).toHaveLength(laboratoriesAtStart.length + 1);
        expect(response.body.name).toBe(laboratoryData.name);
    };

    test("should return a 201 status and create a new laboratory", async () => {
        await testLaboratoryCreation(data.validLaboratory);
    });
});

describe("GET /api/laboratories/:id", () => {
    test("should return a 200 status and the selected laboratories", async () => {
        const laboratoriesAtStart = await helper.laboratoryInDb();
        const laboratoryToView = laboratoriesAtStart[0];

        const response = await api.get(
            `/api/laboratories/${laboratoryToView.id}`
        );

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.name).toEqual(laboratoryToView.name);
    });
});

describe("PUT /api/laboratories/:id ", () => {
    const testLaboratoryUpdate = async (laboratoryIndex, laboratoryData) => {
        const laboratoriesAtStart = await helper.laboratoryInDb();
        const laboratoryToUpdate = laboratoriesAtStart[laboratoryIndex];

        const response = await api
            .put(`/api/laboratories/${laboratoryToUpdate.id}`)
            .send(laboratoryData);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.code).toBe(laboratoryData.code);
    };

    test("should return a 200 status and update the laboratory's data", async () => {
        await testLaboratoryUpdate(0, data.validLaboratoryUpdate);
    });
});
