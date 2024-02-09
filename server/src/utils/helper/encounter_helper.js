const { Encounter, Location, Doctor, Examination } = require("../../models/");

const returnCreatedEncounter = async (id) => {
    const encounters = await Encounter.findByPk(id, {
        attributes: {
            exclude: ["createdAt", "updatedAt", "locationId", "doctorId"],
        },
        include: [
            {
                model: Location,
                attributes: { exclude: ["createdAt", "updatedAt"] },
            },
            {
                model: Doctor,
                attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
            },
        ],
    });
    return encounters;
};

const returnUpdatedEncounter = async (id) => {
    const encounters = await Encounter.findByPk(id, {
        attributes: {
            exclude: ["createdAt", "updatedAt", "locationId", "doctorId"],
        },
        include: [
            {
                model: Location,
                attributes: { exclude: ["createdAt", "updatedAt"] },
            },
            {
                model: Doctor,
                attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
            },
            {
                model: Examination,
                attributes: {
                    exclude: [
                        "createdAt",
                        "updatedAt",
                        "encounterId",
                        "locationId",
                    ],
                },
            },
        ],
    });
    return encounters;
};

module.exports = {
    returnCreatedEncounter,
    returnUpdatedEncounter,
};
