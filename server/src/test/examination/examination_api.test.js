const supertest = require("supertest");
const app = require("../../index");
const api = supertest(app);
const helper = require("../../utils/test/helper/examination_helper");
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

describe("GET /api/examinations", () => {
    test("should return a 200 status and examinations as json", async () => {
        const response = await api
            .get("/api/examinations")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
    });

    test("should return a 404 status for non-existent examinations", async () => {
        const response = await api
            .get(`/api/examinations/${data.nonExistentExaminationId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toContain("Examination not found");
    });
});

describe("POST /api/examinations", () => {
    const testExaminationCreation = async (
        locationData,
        laboratoryData,
        userData,
        patientData,
        encounterData,
        examinationData
    ) => {
        await helper.truncateAndCascadePatients();

        const examinationsAtStart = await helper.examinationsInDb();

        await api
            .post("/api/locations")
            .set("Authorization", `Bearer ${token}`)
            .send(locationData);

        await api
            .post("/api/laboratories")
            .set("Authorization", `Bearer ${token}`)
            .send(laboratoryData);

        await api
            .post("/api/users")
            .set("Authorization", `Bearer ${token}`)
            .send(userData);

        await api
            .post("/api/patients")
            .set("Authorization", `Bearer ${token}`)
            .send(patientData);

        await api
            .post("/api/encounters")
            .set("Authorization", `Bearer ${token}`)
            .send(encounterData);

        const response = await api
            .post("/api/examinations")
            .set("Authorization", `Bearer ${token}`)
            .send(examinationData);

        expect(response.status).toBe(201);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );

        const examinationdAtEnd = await helper.examinationsInDb();

        expect(examinationdAtEnd).toHaveLength(examinationsAtStart.length + 1);
        expect(response.body.date).toBe(examinationData.date);
    };

    test("should return a 201 status and create a new examinations", async () => {
        await testExaminationCreation(
            data.validLocation,
            data.validLaboratory,
            data.validDoctorUser,
            data.validPatient,
            data.validEncounter,
            data.validExamination
        );
    });
});

describe("GET /api/examinations/:id", () => {
    test("should return a 200 status and the selected examinations", async () => {
        const examinationsAtStart = await helper.examinationsInDb();
        const examinationsToView = examinationsAtStart[0];

        const response = await api
            .get(`/api/examinations/${examinationsToView.id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.subjective).toEqual(examinationsToView.subjective);
    });
});

describe("PUT /api/examinations/:id ", () => {
    const testExaminationUpdate = async (
        locationData,
        laboratoryData,
        patientData,
        encounterData,
        examinationCreateData,
        examinationUpdateData
    ) => {
        await api
            .post("/api/locations")
            .set("Authorization", `Bearer ${token}`)
            .send(locationData);

        await api
            .post("/api/laboratories")
            .set("Authorization", `Bearer ${token}`)
            .send(laboratoryData);

        await api
            .post("/api/patients")
            .set("Authorization", `Bearer ${token}`)
            .send(patientData);

        await api
            .post("/api/encounters")
            .set("Authorization", `Bearer ${token}`)
            .send(encounterData);

        const examinationToUpdate = await api
            .post("/api/examinations")
            .set("Authorization", `Bearer ${token}`)
            .send(examinationCreateData);

        const response = await api
            .put(`/api/examinations/${examinationToUpdate.body.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(examinationUpdateData);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.subjective).toBe(examinationUpdateData.subjective);
    };

    test("should return a 200 status and update the examination's data", async () => {
        await testExaminationUpdate(
            data.validLocation,
            data.validLaboratory,
            data.validPatient,
            data.validEncounter,
            data.validExamination,
            data.validExaminationUpdate
        );
    });
});
