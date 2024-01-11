// Internal modules
const {
    createSecretaryUserSchema,
    createDoctorUserSchema,
    updateSecretaryUserSchema,
    updateDoctorUserSchema,
} = require("../../schema");

const schemas = {
    Doctor: {
        create: createDoctorUserSchema,
        update: updateDoctorUserSchema,
    },
    Secretary: {
        create: createSecretaryUserSchema,
        update: updateSecretaryUserSchema,
    },
};

const validateUser = (type) => (req, res, next) => {
    const schema = schemas[req.body.userType]?.[type];
    if (!schema) {
        return res.status(400).json({ error: "Invalid user type" });
    }

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    req.body = value;
    next();
};

module.exports = {
    validateCreateUser: validateUser("create"),
    validateUpdateUser: validateUser("update"),
};
