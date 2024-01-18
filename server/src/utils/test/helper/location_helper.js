const { sequelize } = require("../../db");
const { Location } = require("../../../models");

const locationsInDb = async () => {
    const locations = await Location.findAll();
    return locations;
};

const deleteSelectedLocations = async () => {
    try {
        await sequelize.query("DELETE FROM locations");
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

module.exports = {
    locationsInDb,
    deleteSelectedLocations,
};
