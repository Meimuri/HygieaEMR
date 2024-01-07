const unknownEndpoint = (_req, res, _next) => {
    return res.status(404).send({ error: "Unknown endpoint" });
};

module.exports = unknownEndpoint;
