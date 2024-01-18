const tokenExtractor = (req, res, next) => {
    const authorization = req.get("authorization");

    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        req.token = authorization.replace("bearer ", "");
    } else {
        req.token = null;
    }
    next();
};

module.exports = tokenExtractor;
