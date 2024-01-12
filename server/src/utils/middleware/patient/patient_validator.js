// Internal modules
const { createPatientSchema } = require("../../schema");

const schemas = {
    create: createPatientSchema,
    // update: updatePatientSchema,
};

const validatePatient = (type) => (req, res, next) => {
    const schema = schemas[type];

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    req.body = value;
    next();
};

module.exports = {
    validateCreatePatient: validatePatient("create"),
    validateUpdatePatient: validatePatient("update"),
};
