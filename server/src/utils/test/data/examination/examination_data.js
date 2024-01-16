const validExamination = {
    encounterId: 1,
    date: "2024-01-16T13:46:01.000Z",
    locationId: 1,
    subjective:
        "The patient has been experiencing severe headaches and occasional dizziness for the past two weeks. The patient also reported difficulty sleeping and loss of appetite.",
    objective:
        "Upon examination, the patient appears fatigued and pale. Vital signs are within normal limits except for an elevated blood pressure. Neurological examination revealed no abnormalities.",
    assessment:
        "The symptoms suggest a possible neurological condition. However, the elevated blood pressure and reported sleep issues may also indicate a stress-related disorder. Further diagnostic tests are required to confirm the diagnosis.",
    plan: "Order a complete blood count, MRI of the brain, and a sleep study. Recommend the patient to reduce stressors and improve sleep hygiene. A follow-up appointment will be scheduled after the test results are available.",
    diagnosis: "Unspecified neurological condition",
    notes: "The patient was advised to seek immediate medical attention if symptoms worsen or new symptoms appear before the next appointment. The importance of adhering to the recommended lifestyle changes was also emphasized.",
    laboratory: [1],
};

const validExaminationUpdate = {
    encounterId: 1,
    date: "2024-01-18T13:46:01.000Z",
    locationId: 1,
    subjective:
        "The patient reports a persistent cough and shortness of breath for the past three days. The patient also mentioned experiencing intermittent chest pain.",
    objective:
        "The patient appears uncomfortable and breathless. Vital signs show an elevated heart rate and decreased oxygen saturation. Lung examination revealed decreased breath sounds on the right side.",
    assessment:
        "The symptoms and physical examination findings suggest a possible respiratory condition. Further diagnostic tests are required to confirm the diagnosis.",
    plan: "Order a chest X-ray, complete blood count, and arterial blood gas analysis. Prescribe a short-acting bronchodilator for symptom relief. Schedule a follow-up appointment to discuss the test results and next steps.",
    diagnosis: "Unspecified respiratory condition",
    notes: "The patient was advised to use the bronchodilator as needed and to seek immediate medical attention if symptoms worsen or new symptoms appear.",
    laboratory: [1],
};

const invalidExamination = {
    encounterId: {
        encounterId1: "abc",
        encounterId2: 123.45,
    },
    date: {
        date1: "abc",
        date2: 123,
    },
    locationId: {
        locationId1: "abc",
        locationId2: 123.45,
    },
    subjective: {
        subjective1: 123,
        subjective2: "a".repeat(101),
    },
    objective: {
        objective1: 123,
        objective2: "a".repeat(101),
    },
    assessment: {
        assessment1: 123,
        assessment2: "a".repeat(101),
    },
    plan: {
        plan1: 123,
        plan2: "a".repeat(101),
    },
    diagnosis: {
        diagnosis1: 123,
        diagnosis2: "a".repeat(101),
    },
    notes: {
        notes1: 123,
        notes2: "a".repeat(101),
    },
    laboratory: {
        laboratory1: "abc",
        laboratory2: [123.45, "abc"],
    },
};

const nonExistentExaminationId = "21";

module.exports = {
    validExamination,
    validExaminationUpdate,
    invalidExamination,
    nonExistentExaminationId,
};
