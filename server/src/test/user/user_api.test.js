const supertest = require("supertest");
const app = require("../../index");
const api = supertest(app);
const helper = require("../../utils/test/helper/user_helper");
const data = require("../../utils/test/data");

let token = "";

beforeAll(async () => {
    await helper.truncateAndCascadeUsers();
    await helper.createUserDoctor();

    const user = {
        username: "userforlogin",
        password: "Qweasd!2",
    };

    const response = await api.post("/api/login").send(user);
    token = response.body.token;
}, 100000);

describe("GET /api/users", () => {
    test("should return a 200 status and users as json", async () => {
        const response = await api
            .get("/api/users")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
    });

    test("should return a 404 status for non-existent user", async () => {
        const response = await api
            .get(`/api/users/${data.nonExistentUserId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toContain("User not found");
    });
});

describe("POST /api/users", () => {
    const testUserCreation = async (userData) => {
        await helper.deleteSelectedUsers();
        const usersAtStart = await helper.usersInDb();

        const response = await api
            .post("/api/users")
            .set("Authorization", `Bearer ${token}`)
            .send(userData);

        expect(response.status).toBe(201);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );

        const usersAtEnd = await helper.usersInDb();

        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
        expect(response.body.username).toBe(userData.username);
    };

    test("should return a 201 status and create a new doctor type user", async () => {
        await testUserCreation(data.validDoctorUser);
    });

    test("should return a 201 status and create a new secretary type user", async () => {
        await testUserCreation(data.validSecretaryUser);
    });

    test("should return a 400 status if username is already existing", async () => {
        const response = await api
            .post("/api/users")
            .set("Authorization", `Bearer ${token}`)
            .send(data.userForLogin);

        expect(response.status).toBe(400);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.error).toContain("Duplicate Entry");
    });
});

describe("GET /api/users/:id", () => {
    test("should return a 200 status and the selected user", async () => {
        const usersAtStart = await helper.usersInDb();
        const userToView = usersAtStart[0];

        const response = await api
            .get(`/api/users/${userToView.id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.username).toEqual(userToView.username);
    });
});

describe("PUT /api/users/:id ", () => {
    const testUserUpdate = async (userCreateData, userUpdateData) => {
        await helper.deleteSelectedUsers();
        const userToUpdate = await api
            .post("/api/users")
            .set("Authorization", `Bearer ${token}`)
            .send(userCreateData);

        const response = await api
            .put(`/api/users/${userToUpdate.body.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(userUpdateData);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.firstName).toBe(userUpdateData.firstName);
    };

    test("should return a 200 status and update the doctor's data", async () => {
        await testUserUpdate(data.validDoctorUser, data.validDoctorUserUpdate);
    });

    test("should return a 200 status and update the secretary's data", async () => {
        await testUserUpdate(
            data.validSecretaryUser,
            data.validSecretaryUserUpdate
        );
    });
});
