// External modules
const Sequelize = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");

// Internal modules
const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL);

const runMigrations = async () => {
    const migrator = new Umzug({
        migrations: {
            glob: "src/migrations/*.ts",
        },
        storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
        context: sequelize.getQueryInterface(),
        logger: console,
    });

    const migrations = await migrator.up();
    console.log("Migrations up to date", {
        files: migrations.map((mig) => mig.name),
    });
};

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        await runMigrations();
        console.log("Connected to the database");
    } catch (err) {
        console.log("Failed to connect to the database", err);
        return process.exit(1);
    }

    return null;
};

module.exports = { connectToDatabase, sequelize };
