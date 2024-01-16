const Joi = require("joi");

const createExaminationSchema = Joi.object({
    encounterId: Joi.number().integer().required().messages({
        "any.required": "Encounter ID is required",
        "number.base": "Encounter ID must be a number",
        "number.integer": "Encounter ID must be an integer",
    }),
    encounterId: Joi.number().integer().required().messages({
        "any.required": "Encounter ID is required",
        "number.base": "Encounter ID must be a number",
        "number.integer": "Encounter ID must be an integer",
    }),
    date: Joi.date().required().messages({
        "any.required": "Date is required",
        "date.base": "Date must be a valid date",
    }),
    locationId: Joi.number().integer().required().messages({
        "any.required": "Location ID is required",
        "number.base": "Location ID must be a number",
        "number.integer": "Location ID must be an integer",
    }),
    subjective: Joi.string().trim().optional().messages({
        "string.base": "Subjective must be a string",
    }),
    objective: Joi.string().trim().optional().messages({
        "string.base": "Objective must be a string",
    }),
    assessment: Joi.string().trim().optional().messages({
        "string.base": "Assessment must be a string",
    }),
    plan: Joi.string().trim().optional().messages({
        "string.base": "Plan must be a string",
    }),
    diagnosis: Joi.string().trim().optional().messages({
        "string.base": "Diagnosis must be a string",
    }),
    notes: Joi.string().trim().optional().messages({
        "string.base": "Notes must be a string",
    }),
    laboratory: Joi.array().items(Joi.number().integer()).optional().messages({
        "array.base": "Laboratory IDs must be an array",
        "number.base": "Each Laboratory ID must be a number",
        "number.integer": "Each Laboratory ID must be an integer",
    }),
});

const updateExaminationSchema = Joi.object({
    encounterId: Joi.number().integer().required().messages({
        "any.required": "Encounter ID is required",
        "number.base": "Encounter ID must be a number",
        "number.integer": "Encounter ID must be an integer",
    }),
    encounterId: Joi.number().integer().required().messages({
        "any.required": "Encounter ID is required",
        "number.base": "Encounter ID must be a number",
        "number.integer": "Encounter ID must be an integer",
    }),
    date: Joi.date().required().messages({
        "any.required": "Date is required",
        "date.base": "Date must be a valid date",
    }),
    locationId: Joi.number().integer().required().messages({
        "any.required": "Location ID is required",
        "number.base": "Location ID must be a number",
        "number.integer": "Location ID must be an integer",
    }),
    subjective: Joi.string().trim().optional().messages({
        "string.base": "Subjective must be a string",
    }),
    objective: Joi.string().trim().optional().messages({
        "string.base": "Objective must be a string",
    }),
    assessment: Joi.string().trim().optional().messages({
        "string.base": "Assessment must be a string",
    }),
    plan: Joi.string().trim().optional().messages({
        "string.base": "Plan must be a string",
    }),
    diagnosis: Joi.string().trim().optional().messages({
        "string.base": "Diagnosis must be a string",
    }),
    notes: Joi.string().trim().optional().messages({
        "string.base": "Notes must be a string",
    }),
    laboratory: Joi.array().items(Joi.number().integer()).optional().messages({
        "array.base": "Laboratory IDs must be an array",
        "number.base": "Each Laboratory ID must be a number",
        "number.integer": "Each Laboratory ID must be an integer",
    }),
});

module.exports = {
    createExaminationSchema,
    updateExaminationSchema,
};
