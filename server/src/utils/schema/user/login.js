const Joi = require("joi");

const loginSchema = Joi.object({
    username: Joi.string().trim().required().messages({
        "any.required": "Username is required",
    }),
    password: Joi.string().trim().required().messages({
        "any.required": "Password is required",
    }),
});

module.exports = { loginSchema };
