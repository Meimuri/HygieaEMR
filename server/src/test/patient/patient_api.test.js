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
