const supertest = require("supertest");
const app = require("../index");
const api = supertest(app);

describe("Accessing unknown endpoints", () => {
    test("should return a 404 error with 'Unknown endpoint' message", async () => {
        const response = await api.get("/api/unknownendpoint");

        expect(response.status).toBe(404);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.error).toContain("Unknown endpoint");
    });
});

describe("Accessing endpoints with malformatted id", () => {
    test("should return a 400 error with 'Malformatted id' message", async () => {
        const response = await api.get("/api/users/12 123asd");

        expect(response.status).toBe(400);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.error).toContain("Malformatted id");
    });
});
