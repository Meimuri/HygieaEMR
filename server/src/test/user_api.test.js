const supertest = require("supertest");
const app = require("../index");
const api = supertest(app);
const helper = require("../utils/test/user_helper");
const data = require("../utils/test/data");

describe("GET /api/users", () => {
    test("should return a 200 status and users as json", async () => {
        const response = await api.get("/api/users");

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
    });

    test("should return a 200 status and have zero users", async () => {
        const response = await api.get("/api/users");

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(0);
    });

    test("should return a 404 status for non-existent user", async () => {
        const response = await api.get(`/api/users/${data.nonExistentUserId}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toContain("User not found");
    });
});

describe("POST /api/users", () => {
    test.skip("should return a 201 status and create a new user", async () => {
        const usersAtStart = await helper.usersInDb();

        const response = await api.post("/api/users").send(data.validUser);

        expect(response.status).toBe(201);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );

        const usersAtEnd = await helper.usersInDb();

        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
        expect(response.body.username).toBe(data.validUser.username);
    });

    test.skip("should return a 400 status if username is already existing", async () => {
        const response = await api.post("/api/users").send(data.validUser);

        expect(response.status).toBe(400);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.error).toContain("Duplicate Entry");
    });
});

describe("GET /api/users/:id", () => {
    test.skip("should return a 200 status and the created user", async () => {
        const usersAtStart = await helper.usersInDb();
        const userToView = usersAtStart[0];

        const response = await api.get(`/api/users/${userToView.id}`);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.username).toEqual(userToView.username);
    });
});

describe("PUT /api/users/:id ", () => {
    test.skip("should return a 200 status and update the user's username", async () => {
        const usersAtStart = await helper.usersInDb();
        const userToUpdate = usersAtStart[0];

        const response = await api
            .put(`/api/users/${userToUpdate.id}`)
            .send({ username: data.validUsername });

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.username).toBe(data.validUsername);
    });
});
