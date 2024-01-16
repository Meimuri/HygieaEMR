const validEncounter = {
    patientId: 1,
    date: "2024-01-16T08:06:13.000Z",
    class: "Inpatient",
    status: "Planned",
    reasonForVisit: "Regular check-up",
    chiefComplaint: "Headache",
    notes: "Patient has been experiencing headaches for the past week",
    locationId: 1,
};

const validEncounterUpdate = {
    patientId: 1,
    date: "2024-01-17T08:06:13.000Z",
    class: "Outpatient",
    status: "In Progress",
    reasonForVisit: "Follow-up check-up",
    chiefComplaint: "Migraine",
    notes: "Patient's headaches have been worsening",
    locationId: 1,
};

const invalidEncounter = {
    patientId: {
        patientId1: "abc",
        patientId2: 123.45,
    },
    date: {
        date1: "abc",
        date2: 123,
    },
    class: {
        class1: "abc",
        class2: 123,
        class3: "InvalidClass",
    },
    status: {
        status1: "abc",
        status2: 123,
        status3: "InvalidStatus",
    },
    reasonForVisit: {
        reasonForVisit1: 123,
        reasonForVisit2: "a".repeat(101),
    },
    chiefComplaint: {
        chiefComplaint1: 123,
        chiefComplaint2: "a".repeat(101),
    },
    notes: {
        notes1: 123,
        notes2: "a".repeat(101),
    },
    locationId: {
        locationId1: "abc",
        locationId2: 123.45,
    },
};

const nonExistentEncounterId = "21";

module.exports = {
    validEncounter,
    validEncounterUpdate,
    invalidEncounter,
    nonExistentEncounterId,
};
