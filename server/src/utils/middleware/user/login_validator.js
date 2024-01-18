// Internal modules
const { loginSchema } = require("../../schema");

const schemas = {
    login: loginSchema,
};

const validateInput = (type) => (req, res, next) => {
    const schema = schemas[type];

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    req.body = value;
    next();
};

module.exports = {
    validateLogin: validateInput("login"),
};
