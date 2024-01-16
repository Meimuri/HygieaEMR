// Internal modules
const {
    createEncounterSchema,
    updateEncounterSchema,
} = require("../../schema");

const schemas = {
    create: createEncounterSchema,
    update: updateEncounterSchema,
};

const validateEncounter = (type) => (req, res, next) => {
    const schema = schemas[type];

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    req.body = value;
    next();
};

module.exports = {
    validateCreateEncounter: validateEncounter("create"),
    validateUpdateEncounter: validateEncounter("update"),
};
