const Sequelize = require("sequelize");
const { DATABASE_URL } = require("../config");
const sequelize = new Sequelize(DATABASE_URL);

module.exports = async () => {
    await sequelize.close();
    // process.exit(0);
};
