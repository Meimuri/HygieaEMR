import Joi from "joi";

const schema = Joi.object({
    date: Joi.date().required().label("Date"),
    locationId: Joi.number().integer().required().label("Location Id"),
    subjective: Joi.string()
        .trim()
        .allow("", null)
        .optional()
        .label("Subjective"),
    objective: Joi.string()
        .trim()
        .allow("", null)
        .optional()
        .label("Objective"),
    assessment: Joi.string()
        .trim()
        .allow("", null)
        .optional()
        .label("Assessment"),
    plan: Joi.string().trim().allow("", null).optional().label("Plan"),
    diagnosis: Joi.string()
        .trim()
        .allow("", null)
        .optional()
        .label("Diagnosis"),
    notes: Joi.string().trim().allow("", null).optional().label("Notes"),
});

export default schema;
