const { Encounter, Location, Doctor } = require("../../models/");

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

module.exports = {
    returnCreatedEncounter,
};
