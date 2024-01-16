const { Examination } = require("../../../models");

const examinationsInDb = async () => {
    const examination = await Examination.findAll();
    return examination;
};

module.exports = {
    examinationsInDb,
};
