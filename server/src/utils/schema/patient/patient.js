const Joi = require("joi");

// Schema for creating a patient
const createPatientSchema = Joi.object({
    firstName: Joi.string().trim().required().messages({
        "any.required": "First Name is required",
        "string.base": "First Name must be a string",
    }),
    middleName: Joi.string().trim().optional().messages({
        "string.base": "Middle Name must be a string",
    }),
    lastName: Joi.string().trim().required().messages({
        "any.required": "Last Name is required",
        "string.base": "Last Name must be a string",
    }),
    birthDate: Joi.date().required().messages({
        "any.required": "Birth Date is required",
        "date.base": "Birth Date must be a date",
    }),
    gender: Joi.string().trim().valid("Male", "Female").required().messages({
        "any.required": "Gender is required",
        "any.only": "Gender must be either Male or Female",
    }),
    maritalStatus: Joi.string()
        .trim()
        .valid("Single", "Married", "Divorced", "Widowed", "Separated")
        .required()
        .messages({
            "any.required": "Marital Status is required",
            "any.only":
                "Marital Status must be either Single, Married, Divorced, Widowed, or Separated",
        }),
    bloodType: Joi.string()
        .trim()
        .valid(
            "A",
            "B",
            "AB",
            "O",
            "A+",
            "A-",
            "B+",
            "B-",
            "AB+",
            "AB-",
            "O+",
            "O-"
        )
        .required()
        .messages({
            "any.required": "Blood Type is required",
            "any.only": "Blood Type must be a valid blood type",
        }),
    referrerName: Joi.string().trim().optional().messages({
        "string.base": "Referrer Name must be a string",
    }),
    notes: Joi.string().trim().optional().messages({
        "string.base": "Notes must be a string",
    }),
    address: Joi.string().trim().optional().messages({
        "string.base": "Address must be a string",
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
    homePhone: Joi.string().trim().optional().messages({
        "string.base": "Home Phone must be a string",
    }),
    workPhone: Joi.string().trim().optional().messages({
        "string.base": "Work Phone must be a string",
    }),
    mobilePhonePrimary: Joi.string().trim().optional().messages({
        "string.base": "Mobile Phone Primary must be a string",
    }),
    mobilePhoneSecondary: Joi.string().trim().optional().messages({
        "string.base": "Mobile Phone Secondary must be a string",
    }),
    emailAddress: Joi.string().trim().email().optional().messages({
        "string.base": "Email Address must be a string",
        "string.email": "Email Address must be a valid email",
    }),
});

const updatePatientSchema = Joi.object({
    firstName: Joi.string().trim().required().messages({
        "any.required": "First Name is required",
        "string.base": "First Name must be a string",
    }),
    middleName: Joi.string().trim().optional().messages({
        "string.base": "Middle Name must be a string",
    }),
    lastName: Joi.string().trim().required().messages({
        "any.required": "Last Name is required",
        "string.base": "Last Name must be a string",
    }),
    birthDate: Joi.date().required().messages({
        "any.required": "Birth Date is required",
        "date.base": "Birth Date must be a date",
    }),
    gender: Joi.string().trim().valid("Male", "Female").required().messages({
        "any.required": "Gender is required",
        "any.only": "Gender must be either Male or Female",
    }),
    maritalStatus: Joi.string()
        .trim()
        .valid("Single", "Married", "Divorced", "Widowed", "Separated")
        .required()
        .messages({
            "any.required": "Marital Status is required",
            "any.only":
                "Marital Status must be either Single, Married, Divorced, Widowed, or Separated",
        }),
    bloodType: Joi.string()
        .trim()
        .valid(
            "A",
            "B",
            "AB",
            "O",
            "A+",
            "A-",
            "B+",
            "B-",
            "AB+",
            "AB-",
            "O+",
            "O-"
        )
        .required()
        .messages({
            "any.required": "Blood Type is required",
            "any.only": "Blood Type must be a valid blood type",
        }),
    referrerName: Joi.string().trim().optional().messages({
        "string.base": "Referrer Name must be a string",
    }),
    notes: Joi.string().trim().optional().messages({
        "string.base": "Notes must be a string",
    }),
    address: Joi.string().trim().optional().messages({
        "string.base": "Address must be a string",
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
    homePhone: Joi.string().trim().optional().messages({
        "string.base": "Home Phone must be a string",
    }),
    workPhone: Joi.string().trim().optional().messages({
        "string.base": "Work Phone must be a string",
    }),
    mobilePhonePrimary: Joi.string().trim().optional().messages({
        "string.base": "Mobile Phone Primary must be a string",
    }),
    mobilePhoneSecondary: Joi.string().trim().optional().messages({
        "string.base": "Mobile Phone Secondary must be a string",
    }),
    emailAddress: Joi.string().trim().email().optional().messages({
        "string.base": "Email Address must be a string",
        "string.email": "Email Address must be a valid email",
    }),
});

module.exports = {
    createPatientSchema,
    updatePatientSchema,
};
