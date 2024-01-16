// Internal modules
const {
    createLaboratorySchema,
    updateLaboratorySchema,
} = require("../../../schema/");

const schemas = {
    create: createLaboratorySchema,
    update: updateLaboratorySchema,
};

const validateLaboratory = (type) => (req, res, next) => {
    const schema = schemas[type];

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    req.body = value;
    next();
};

module.exports = {
    validateCreateLaboratory: validateLaboratory("create"),
    validateUpdateLaboratory: validateLaboratory("update"),
};
