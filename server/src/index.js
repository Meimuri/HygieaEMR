// External modules
const express = require("express");
require("express-async-errors");

// Internal modules
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");
const usersRouter = require("./controllers/users");
const patientsRouter = require("./controllers/patients");
const encountersRouter = require("./controllers/encounters");
const middleware = require("./utils/middleware/");

const app = express();
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/patients", patientsRouter);
app.use("/api/encounters", encountersRouter);

const start = async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

if (process.env.NODE_ENV !== "test") {
    start().catch((err) => {
        console.error("Failed to start the server", err);
        process.exit(1);
    });
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
