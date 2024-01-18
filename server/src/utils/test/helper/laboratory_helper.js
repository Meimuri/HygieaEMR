const { sequelize } = require("../../db");
const { Laboratory } = require("../../../models");

const laboratoryInDb = async () => {
    const laboratories = await Laboratory.findAll();
    return laboratories;
};

const deleteSelectedLaboratories = async () => {
    try {
        await sequelize.query("DELETE FROM laboratories");
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

module.exports = {
    laboratoryInDb,
    deleteSelectedLaboratories,
};
