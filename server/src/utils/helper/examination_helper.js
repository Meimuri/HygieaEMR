const { Location, Laboratory, Examination } = require("../../models/");

const returnUpdatedExamination = async (id) => {
    const updatedExamination = await Examination.findOne({
        where: { id: id },
        attributes: {
            exclude: ["createdAt", "updatedAt", "encounterId", "locationId"],
        },
        include: [
            {
                model: Location,
                attributes: { exclude: ["createdAt", "updatedAt"] },
            },
            {
                model: Laboratory,
                attributes: { exclude: ["createdAt", "updatedAt"] },
                through: {
                    attributes: [],
                },
            },
        ],
    });

    return updatedExamination;
};

module.exports = {
    returnUpdatedExamination,
};
