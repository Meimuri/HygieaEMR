const unknownEndpoint = (_req, res, _next) => {
    return res.status(404).send({ error: "Unknown endpoint" });
};

const errorHandler = (error, _req, res, _next) => {
    console.error(error.message);
    if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Invalid token" });
    } else if (error.name === "SequelizeDatabaseError") {
        return res.status(400).json({ error: "Malformatted id" });
    } else if (error.name === "SequelizeConnectionError") {
        return res.status(400).json({ error: "Database Connection Error" });
    } else if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ error: error.message });
    } else {
        return res.status(error.status || 500).json({
            error: error.message || "Internal Server Error",
        });
    }
};

module.exports = {
    unknownEndpoint,
    errorHandler,
};
