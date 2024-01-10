const Joi = require("joi");

// Schema for creating a user
const createUserSchema = Joi.object({
    username: Joi.string().required().messages({
        "any.required": "Username is required",
        "string.base": "Username must be a string",
    }),
    password: Joi.string().min(3).required().messages({
        "any.required": "Password is required",
        "string.base": "Password must be a string",
        "string.min": "Password should have 3 or more characters",
    }),
    name: Joi.string().min(3).optional().messages({
        "string.base": "Name must be a string",
        "string.min": "Name should have 3 or more characters",
    }),
});

// Schema for updating a user
const updateUserSchema = Joi.object({
    username: Joi.string().required().messages({
        "any.required": "Username is required",
        "string.base": "Username must be a string",
    }),
    password: Joi.string().min(3).optional().messages({
        "string.base": "Password must be a string",
        "string.min": "Password should have 3 or more characters",
    }),
});

module.exports = {
    createUserSchema,
    updateUserSchema,
};
