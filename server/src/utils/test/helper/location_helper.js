const { Location } = require("../../../models");

const locationsInDb = async () => {
    const locations = await Location.findAll();
    return locations;
};

module.exports = {
    locationsInDb,
};
