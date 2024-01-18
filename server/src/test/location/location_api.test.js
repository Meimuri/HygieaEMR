const supertest = require("supertest");
const app = require("../../index");
const api = supertest(app);
const helper = require("../../utils/test/helper/location_helper");
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

describe("GET /api/locations", () => {
    test("should return a 200 status and locations as json", async () => {
        const response = await api
            .get("/api/locations")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
    });

    test("should return a 404 status for non-existent locations", async () => {
        const response = await api
            .get(`/api/locations/${data.nonExistentLocationId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toContain("Location not found");
    });
});

describe("POST /api/locations", () => {
    const testLocationCreation = async (locationData) => {
        await helper.deleteSelectedLocations();
        const locationsAtStart = await helper.locationsInDb();

        const response = await api
            .post("/api/locations")
            .set("Authorization", `Bearer ${token}`)
            .send(locationData);

        expect(response.status).toBe(201);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );

        const locationsAtEnd = await helper.locationsInDb();

        expect(locationsAtEnd).toHaveLength(locationsAtStart.length + 1);
        expect(response.body.code).toBe(locationData.code);
    };

    test("should return a 201 status and create a new location", async () => {
        await testLocationCreation(data.validLocation);
    });
});

describe("GET /api/locations/:id", () => {
    test("should return a 200 status and the selected locations", async () => {
        const locationsAtStart = await helper.locationsInDb();
        const locationToView = locationsAtStart[0];

        const response = await api
            .get(`/api/locations/${locationToView.id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.code).toEqual(locationToView.code);
    });
});

describe("PUT /api/locations/:id ", () => {
    const testLocationUpdate = async (
        locationCreateData,
        locationUpdateData
    ) => {
        await helper.deleteSelectedLocations();

        const locationToUpdate = await api
            .post("/api/locations")
            .set("Authorization", `Bearer ${token}`)
            .send(locationCreateData);

        const response = await api
            .put(`/api/locations/${locationToUpdate.body.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(locationUpdateData);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.code).toBe(locationUpdateData.code);
    };

    test("should return a 200 status and update the location's data", async () => {
        await testLocationUpdate(data.validLocation, data.validLocationUpdate);
    });
});
