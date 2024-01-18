const supertest = require("supertest");
const app = require("../../index");
const api = supertest(app);
const helper = require("../../utils/test/helper/laboratory_helper");
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

describe("GET /api/laboratories", () => {
    test("should return a 200 status and laboratories as json", async () => {
        const response = await api
            .get("/api/laboratories")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
    });

    test("should return a 404 status for non-existent laboratories", async () => {
        const response = await api
            .get(`/api/laboratories/${data.nonExistentLaboratoryId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toContain("Laboratory not found");
    });
});

describe("POST /api/laboratories", () => {
    const testLaboratoryCreation = async (laboratoryData) => {
        await helper.deleteSelectedLaboratories();
        const laboratoriesAtStart = await helper.laboratoryInDb();

        const response = await api
            .post("/api/laboratories")
            .set("Authorization", `Bearer ${token}`)
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

        const response = await api
            .get(`/api/laboratories/${laboratoryToView.id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.name).toEqual(laboratoryToView.name);
    });
});

describe("PUT /api/laboratories/:id ", () => {
    const testLaboratoryUpdate = async (
        laboratoryCreateData,
        laboratoryUpdateData
    ) => {
        await helper.deleteSelectedLaboratories();

        const laboratoryToUpdate = await api
            .post("/api/laboratories")
            .set("Authorization", `Bearer ${token}`)
            .send(laboratoryCreateData);

        const response = await api
            .put(`/api/laboratories/${laboratoryToUpdate.body.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(laboratoryUpdateData);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.code).toBe(laboratoryUpdateData.code);
    };

    test("should return a 200 status and update the laboratory's data", async () => {
        await testLaboratoryUpdate(
            data.validLaboratory,
            data.validLaboratoryUpdate
        );
    });
});
