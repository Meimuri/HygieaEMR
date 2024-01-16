const { Encounter } = require("../../../models");

const encountersInDb = async () => {
    const encounter = await Encounter.findAll();
    return encounter;
};

module.exports = {
    encountersInDb,
};
