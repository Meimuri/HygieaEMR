const Sequelize = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");
const { DATABASE_URL } = require("../config");

module.exports = async () => {
    const sequelize = new Sequelize(DATABASE_URL, {
        logging: false,
    });

    const umzug = new Umzug({
        migrations: {
            glob: "src/migrations/*.js",
        },
        storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
        context: sequelize.getQueryInterface(),
        // logger: console,
        logger: undefined,
    });

    // Remove previous migrations
    await umzug.down();

    // Migrate up
    const migrations = await umzug.up();
    console.log("Migrations up to date", {
        files: migrations.map((mig) => mig.name),
    });
};
