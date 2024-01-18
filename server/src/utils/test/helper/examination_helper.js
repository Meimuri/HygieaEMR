const { sequelize } = require("../../db");
const { Examination } = require("../../../models");

const examinationsInDb = async () => {
    const examination = await Examination.findAll();
    return examination;
};

const truncateAndCascadePatients = async () => {
    try {
        await sequelize.query("TRUNCATE patients RESTART IDENTITY CASCADE");
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

module.exports = {
    examinationsInDb,
    truncateAndCascadePatients,
};
