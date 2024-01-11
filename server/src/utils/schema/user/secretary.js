const Joi = require("joi");

// Schema for creating a user
const createSecretaryUserSchema = Joi.object({
    username: Joi.string().trim().required().messages({
        "any.required": "Username is required",
        "string.base": "Username must be a string",
    }),
    password: Joi.string().trim().min(3).required().messages({
        "any.required": "Password is required",
        "string.base": "Password must be a string",
        "string.min": "Password should have 3 or more characters",
    }),
    userType: Joi.string()
        .trim()
        .valid("Doctor", "Secretary")
        .required()
        .messages({
            "any.required": "User type is required",
            "any.only": "User type must be either Doctor or Secretary",
        }),
    firstName: Joi.string().trim().min(3).required().messages({
        "any.required": "First Name is required",
        "string.base": "First Name must be a string",
        "string.min": "First Name should have 3 or more characters",
    }),
    lastName: Joi.string().trim().min(3).optional().messages({
        "string.base": "Last Name must be a string",
        "string.min": "Last Name should have 3 or more characters",
    }),
});

// Schema for updating a user
const updateSecretaryUserSchema = Joi.object({
    username: Joi.string().trim().optional().messages({
        "any.required": "Username is required",
        "string.base": "Username must be a string",
    }),
    password: Joi.string().trim().min(3).optional().messages({
        "string.base": "Password must be a string",
        "string.min": "Password should have 3 or more characters",
    }),
    userType: Joi.string()
        .trim()
        .valid("Doctor", "Secretary")
        .optional()
        .messages({
            "any.only": "User type must be either Doctor or Secretary",
        }),
    firstName: Joi.string().trim().min(3).optional().messages({
        "string.base": "First Name must be a string",
        "string.min": "First Name should have 3 or more characters",
    }),
    lastName: Joi.string().trim().min(3).optional().messages({
        "string.base": "Last Name must be a string",
        "string.min": "Last Name should have 3 or more characters",
    }),
});

module.exports = {
    createSecretaryUserSchema,
    updateSecretaryUserSchema,
};
