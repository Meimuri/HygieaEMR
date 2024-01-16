const Joi = require("joi");

const createLocationSchema = Joi.object({
    code: Joi.string().trim().required().messages({
        "any.required": "Code is required",
        "string.base": "Code must be a string",
    }),
    name: Joi.string().trim().required().messages({
        "any.required": "Name is required",
        "string.base": "Name must be a string",
    }),
    address1: Joi.string().trim().optional().messages({
        "string.base": "Address1 must be a string",
    }),
    address2: Joi.string().trim().optional().messages({
        "string.base": "Address2 must be a string",
    }),
    city: Joi.string().trim().optional().messages({
        "string.base": "City must be a string",
    }),
    province: Joi.string().trim().optional().messages({
        "string.base": "Province must be a string",
    }),
    zipCode: Joi.number().integer().optional().messages({
        "number.base": "Zip Code must be a number",
        "number.integer": "Zip Code must be an integer",
    }),
});

const updateLocationSchema = Joi.object({
    code: Joi.string().trim().required().messages({
        "any.required": "Code is required",
        "string.base": "Code must be a string",
    }),
    name: Joi.string().trim().required().messages({
        "any.required": "Name is required",
        "string.base": "Name must be a string",
    }),
    address1: Joi.string().trim().optional().messages({
        "string.base": "Address1 must be a string",
    }),
    address2: Joi.string().trim().optional().messages({
        "string.base": "Address2 must be a string",
    }),
    city: Joi.string().trim().optional().messages({
        "string.base": "City must be a string",
    }),
    province: Joi.string().trim().optional().messages({
        "string.base": "Province must be a string",
    }),
    zipCode: Joi.number().integer().optional().messages({
        "number.base": "Zip Code must be a number",
        "number.integer": "Zip Code must be an integer",
    }),
});

module.exports = {
    createLocationSchema,
    updateLocationSchema,
};
