const Joi = require("joi");

const createLaboratorySchema = Joi.object({
    name: Joi.string().trim().required().messages({
        "any.required": "Name is required",
        "string.base": "Name must be a string",
    }),
    category: Joi.string().trim().required().messages({
        "any.required": "Category is required",
        "string.base": "Category must be a string",
    }),
});

const updateLaboratorySchema = Joi.object({
    name: Joi.string().trim().required().messages({
        "any.required": "Name is required",
        "string.base": "Name must be a string",
    }),
    category: Joi.string().trim().required().messages({
        "any.required": "Category is required",
        "string.base": "Category must be a string",
    }),
});

module.exports = {
    createLaboratorySchema,
    updateLaboratorySchema,
};
