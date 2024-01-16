const supertest = require("supertest");
const app = require("../../index");
const api = supertest(app);
const helper = require("../../utils/test/helper/examination_helper");
const data = require("../../utils/test/data");

describe("GET /api/examinations", () => {
    test("should return a 200 status and examinations as json", async () => {
        const response = await api.get("/api/examinations");

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
    });

    test("should return a 404 status for non-existent examinations", async () => {
        const response = await api.get(
            `/api/examinations/${data.nonExistentExaminationId}`
        );

        expect(response.status).toBe(404);
        expect(response.body.error).toContain("Examination not found");
    });
});

describe("POST /api/examinations", () => {
    const testExaminationCreation = async (
        userData,
        patientData,
        locationData,
        laboratoryData,
        encounterData,
        examinationData
    ) => {
        const examinationsAtStart = await helper.examinationsInDb();

        await api.post("/api/users").send(userData);
        await api.post("/api/patients").send(patientData);
        await api.post("/api/locations").send(locationData);
        await api.post("/api/laboratories").send(laboratoryData);
        await api.post("/api/encounters").send(encounterData);

        const response = await api
            .post("/api/examinations")
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
            data.validDoctorUserForEncounter,
            data.validPatient,
            data.validLocation,
            data.validLaboratory,
            data.validEncounter,
            data.validExamination
        );
    });
});

describe("GET /api/examinations/:id", () => {
    test("should return a 200 status and the selected examinations", async () => {
        const examinationsAtStart = await helper.examinationsInDb();
        const examinationsToView = examinationsAtStart[0];

        const response = await api.get(
            `/api/examinations/${examinationsToView.id}`
        );

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.subjective).toEqual(examinationsToView.subjective);
    });
});

describe("PUT /api/examinations/:id ", () => {
    const testExaminationUpdate = async (examinationIndex, examinationData) => {
        const examinationsAtStart = await helper.examinationsInDb();
        const examinationToUpdate = examinationsAtStart[examinationIndex];

        const response = await api
            .put(`/api/examinations/${examinationToUpdate.id}`)
            .send(examinationData);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body.subjective).toBe(examinationData.subjective);
    };

    test("should return a 200 status and update the examination's data", async () => {
        await testExaminationUpdate(0, data.validExaminationUpdate);
    });
});
