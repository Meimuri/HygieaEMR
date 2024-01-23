// External modules
const express = require("express");
const cors = require("cors");
require("express-async-errors");

// Internal modules
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

const loginRouter = require("./controllers/login");
const laboratoriesRouter = require("./controllers/laboratories");
const locationsRouter = require("./controllers/locations");
const usersRouter = require("./controllers/users");
const patientsRouter = require("./controllers/patients");
const encountersRouter = require("./controllers/encounters");
const examinationsRouter = require("./controllers/examinations");
const middleware = require("./utils/middleware/");

const app = express();
app.use(express.static("dist"));
app.use(express.json());
app.use(cors());
app.use(middleware.tokenExtractor);

app.use("/api/login", loginRouter);
app.use("/api/laboratories", laboratoriesRouter);
app.use("/api/locations", locationsRouter);
app.use("/api/users", usersRouter);
app.use("/api/patients", patientsRouter);
app.use("/api/encounters", encountersRouter);
app.use("/api/examinations", examinationsRouter);

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
