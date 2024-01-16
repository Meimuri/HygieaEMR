// Internal modules
const {
    createLocationSchema,
    updateLocationSchema,
} = require("../../../schema/");

const schemas = {
    create: createLocationSchema,
    update: updateLocationSchema,
};

const validateLocation = (type) => (req, res, next) => {
    const schema = schemas[type];

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    req.body = value;
    next();
};

module.exports = {
    validateCreateLocation: validateLocation("create"),
    validateUpdateLocation: validateLocation("update"),
};
