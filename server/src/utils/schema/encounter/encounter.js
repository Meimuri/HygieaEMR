const Joi = require("joi");

const createEncounterSchema = Joi.object({
    patientId: Joi.number().integer().required().messages({
        "any.required": "Patient ID is required",
        "number.base": "Patient ID must be a number",
        "number.integer": "Patient ID must be an integer",
    }),
    date: Joi.date().required().messages({
        "any.required": "Date is required",
        "date.base": "Date must be a valid date",
    }),
    class: Joi.string()
        .trim()
        .valid(
            "Inpatient",
            "Outpatient",
            "Ambulatory",
            "Emergency",
            "Home Visit",
            "Field Visit",
            "Virtual",
            "Others"
        )
        .required()
        .messages({
            "any.required": "Class is required",
            "any.only":
                "Class must be one of the following: Inpatient, Outpatient, Ambulatory, Emergency, Home Visit, Field Visit, Virtual, Others",
        }),
    status: Joi.string()
        .trim()
        .valid("Planned", "Arrived", "In Progress", "Finished", "Cancelled")
        .required()
        .messages({
            "any.required": "Status is required",
            "any.only":
                "Status must be one of the following: Planned, Arrived, In Progress, Finished, Cancelled",
        }),
    reasonForVisit: Joi.string().trim().optional().messages({
        "string.base": "Reason for Visit must be a string",
    }),
    chiefComplaint: Joi.string().trim().optional().messages({
        "string.base": "Chief Complaint must be a string",
    }),
    notes: Joi.string().trim().optional().messages({
        "string.base": "Notes must be a string",
    }),
});

const updateEncounterSchema = Joi.object({
    patientId: Joi.number().integer().required().messages({
        "any.required": "Patient ID is required",
        "number.base": "Patient ID must be a number",
        "number.integer": "Patient ID must be an integer",
    }),
    date: Joi.date().required().messages({
        "any.required": "Date is required",
        "date.base": "Date must be a valid date",
    }),
    class: Joi.string()
        .trim()
        .valid(
            "Inpatient",
            "Outpatient",
            "Ambulatory",
            "Emergency",
            "Home Visit",
            "Field Visit",
            "Virtual",
            "Others"
        )
        .required()
        .messages({
            "any.required": "Class is required",
            "any.only":
                "Class must be one of the following: Inpatient, Outpatient, Ambulatory, Emergency, Home Visit, Field Visit, Virtual, Others",
        }),
    status: Joi.string()
        .trim()
        .valid("Planned", "Arrived", "In Progress", "Finished", "Cancelled")
        .required()
        .messages({
            "any.required": "Status is required",
            "any.only":
                "Status must be one of the following: Planned, Arrived, In Progress, Finished, Cancelled",
        }),
    reasonForVisit: Joi.string().trim().optional().messages({
        "string.base": "Reason for Visit must be a string",
    }),
    chiefComplaint: Joi.string().trim().optional().messages({
        "string.base": "Chief Complaint must be a string",
    }),
    notes: Joi.string().trim().optional().messages({
        "string.base": "Notes must be a string",
    }),
});

module.exports = {
    createEncounterSchema,
    updateEncounterSchema,
};
