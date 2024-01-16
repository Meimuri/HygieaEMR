const supertest = require("supertest");
const app = require("../../index");
const api = supertest(app);
const helper = require("../../utils/test/helper/location_helper");
const data = require("../../utils/test/data");

describe("GET /api/locations", () => {
    test("should return a 200 status and locations as json", async () => {
        const response = await api.get("/api/locations");

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
    });

    test("should return a 404 status for non-existent locations", async () => {
        const response = await api.get(
            `/api/locations/${data.nonExistentLocationId}`
        );

        expect(response.status).toBe(404);
        expect(response.body.error).toContain("Location not found");
    });
});

describe("POST /api/locations", () => {
    const testLocationCreation = async (locationData) => {
        const locationsAtStart = await helper.locationsInDb();

        const response = await api.post("/api/locations").send(locationData);

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

        const response = await api.get(`/api/locations/${locationToView.id}`);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.code).toEqual(locationToView.code);
    });
});

describe("PUT /api/locations/:id ", () => {
    const testLocationUpdate = async (locationIndex, locationData) => {
        const locationsAtStart = await helper.locationsInDb();
        const locationToUpdate = locationsAtStart[locationIndex];

        const response = await api
            .put(`/api/locations/${locationToUpdate.id}`)
            .send(locationData);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.code).toBe(locationData.code);
    };

    test("should return a 200 status and update the location's data", async () => {
        await testLocationUpdate(0, data.validLocationUpdate);
    });
});
