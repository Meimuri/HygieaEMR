const { sequelize } = require("../../db");
const { Encounter } = require("../../../models");

const encountersInDb = async () => {
    const encounter = await Encounter.findAll();
    return encounter;
};

const truncateAndCascadePatients = async () => {
    try {
        await sequelize.query("TRUNCATE patients RESTART IDENTITY CASCADE");
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

module.exports = {
    encountersInDb,
    truncateAndCascadePatients,
};
