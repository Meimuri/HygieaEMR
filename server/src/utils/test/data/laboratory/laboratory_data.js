const validLaboratory = {
    name: "Biochemistry Lab",
    category: "Clinical Pathology",
};

const validLaboratoryUpdate = {
    name: "Immunology Lab",
    category: "Immunology",
};

const invalidLaboratory = {
    name: {
        name1: 123,
        name2: "",
        name3: " ",
        name4: "a".repeat(101),
    },
    category: {
        category1: 123,
        category2: "a".repeat(101),
    },
};

const nonExistentLaboratoryId = "21";

module.exports = {
    validLaboratory,
    validLaboratoryUpdate,
    invalidLaboratory,
    nonExistentLaboratoryId,
};
