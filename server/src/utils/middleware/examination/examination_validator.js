// Internal modules
const {
    createExaminationSchema,
    updateExaminationSchema,
} = require("../../schema");

const schemas = {
    create: createExaminationSchema,
    update: updateExaminationSchema,
};

const validateExamination = (type) => (req, res, next) => {
    const schema = schemas[type];

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    req.body = value;
    next();
};

module.exports = {
    validateCreateExamination: validateExamination("create"),
    validateUpdateExamination: validateExamination("update"),
};
