const supertest = require("supertest");
const app = require("../index");
const api = supertest(app);

test("Users are returned as json", async () => {
    await api
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /application\/json/);
}, 100000);

test("There are three users", async () => {
    const response = await api.get("/api/users");

    expect(response.body).toHaveLength(4);
}, 100000);
