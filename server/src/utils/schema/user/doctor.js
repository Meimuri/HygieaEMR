const Joi = require("joi");

// Schema for creating a user
const createDoctorUserSchema = Joi.object({
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
    middleName: Joi.string().trim().min(3).optional().messages({
        "string.base": "Middle Name must be a string",
        "string.min": "Middle Name should have 3 or more characters",
    }),
    lastName: Joi.string().trim().min(3).optional().messages({
        "string.base": "Last Name must be a string",
        "string.min": "Last Name should have 3 or more characters",
    }),
    gender: Joi.string().trim().valid("Male", "Female").required().messages({
        "any.required": "Gender is required",
        "any.only": "Gender must be either Male or Female",
    }),
    specialization: Joi.string().trim().min(3).optional().messages({
        "string.base": "Specialization must be a string",
        "string.min": "Specialization should have 3 or more characters",
    }),
    licenseNo: Joi.string().trim().min(3).optional().messages({
        "string.base": "License Number must be a string",
        "string.min": "License Number should have 3 or more characters",
    }),
    ptrNo: Joi.string().trim().min(3).optional().messages({
        "string.base": "PTR Number must be a string",
        "string.min": "PTR Number should have 3 or more characters",
    }),
    s2No: Joi.string().trim().min(3).optional().messages({
        "string.base": "S2 Number must be a string",
        "string.min": "S2 Number should have 3 or more characters",
    }),
});

// Schema for updating a user
const updateDoctorUserSchema = Joi.object({
    userType: Joi.string()
        .trim()
        .valid("Doctor", "Secretary")
        .required()
        .messages({
            "any.only": "User type must be either Doctor or Secretary",
        }),
    firstName: Joi.string().trim().min(3).required().messages({
        "any.required": "First Name is required",
        "string.base": "First Name must be a string",
        "string.min": "First Name should have 3 or more characters",
    }),
    middleName: Joi.string().trim().min(3).optional().messages({
        "string.base": "Middle Name must be a string",
        "string.min": "Middle Name should have 3 or more characters",
    }),
    lastName: Joi.string().trim().min(3).optional().messages({
        "string.base": "Last Name must be a string",
        "string.min": "Last Name should have 3 or more characters",
    }),
    gender: Joi.string().trim().valid("Male", "Female").required().messages({
        "any.required": "Gender is required",
        "any.only": "Gender must be either Male or Female",
    }),
    specialization: Joi.string().trim().min(3).optional().messages({
        "string.base": "Specialization must be a string",
        "string.min": "Specialization should have 3 or more characters",
    }),
    licenseNo: Joi.string().trim().min(3).optional().messages({
        "string.base": "License Number must be a string",
        "string.min": "License Number should have 3 or more characters",
    }),
    ptrNo: Joi.string().trim().min(3).optional().messages({
        "string.base": "PTR Number must be a string",
        "string.min": "PTR Number should have 3 or more characters",
    }),
    s2No: Joi.string().trim().min(3).optional().messages({
        "string.base": "S2 Number must be a string",
        "string.min": "S2 Number should have 3 or more characters",
    }),
});

module.exports = {
    createDoctorUserSchema,
    updateDoctorUserSchema,
};
