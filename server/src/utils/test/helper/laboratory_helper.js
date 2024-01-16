const { Laboratory } = require("../../../models");

const laboratoryInDb = async () => {
    const laboratories = await Laboratory.findAll();
    return laboratories;
};

module.exports = {
    laboratoryInDb,
};
