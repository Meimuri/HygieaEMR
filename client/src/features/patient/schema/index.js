import Joi from "joi";

const schema = Joi.object({
    patientInfo: Joi.object({
        firstName: Joi.string().trim().required().label("First Name"),
        middleName: Joi.string()
            .trim()
            .allow("", null)
            .optional()
            .label("Middle Name"),
        lastName: Joi.string().trim().required().label("Last Name"),
        birthDate: Joi.date().required().label("Birth Date"),
        gender: Joi.string()
            .trim()
            .valid("Male", "Female")
            .required()
            .label("Gender"),
        maritalStatus: Joi.string()
            .trim()
            .valid("Single", "Married", "Divorced", "Widowed", "Separated")
            .required()
            .label("Marital Status"),
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
            .label("Blood Type"),
        referrerName: Joi.string()
            .trim()
            .allow("", null)
            .optional()
            .label("Referrer Name"),
        notes: Joi.string().trim().allow("", null).optional().label("Notes"),
    }),
    addressInfo: Joi.object({
        address: Joi.string()
            .trim()
            .allow("", null)
            .optional()
            .label("Address"),
        address2: Joi.string()
            .trim()
            .allow("", null)
            .optional()
            .label("Address 2"),
        city: Joi.string().trim().allow("", null).optional().label("City"),
        province: Joi.string()
            .trim()
            .allow("", null)
            .optional()
            .label("Province"),
        zipCode: Joi.number()
            .integer()
            .allow("", null)
            .optional()
            .label("Zip Code"),
    }),
    contactInfo: Joi.object({
        homePhone: Joi.string()
            .trim()
            .allow("", null)
            .optional()
            .label("Home Phone"),
        workPhone: Joi.string()
            .trim()
            .allow("", null)
            .optional()
            .label("Work Phone"),
        mobilePhonePrimary: Joi.string()
            .allow("", null)
            .trim()
            .optional()
            .label("Mobile Primary"),
        mobilePhoneSecondary: Joi.string()
            .allow("", null)
            .trim()
            .optional()
            .label("Mobile Secondary"),
        emailAddress: Joi.string()
            .trim()
            .allow("", null)
            .email({ tlds: { allow: false } })
            .optional()
            .label("Email Address"),
    }),
    emergencyContactInfo: Joi.object({
        firstName: Joi.string()
            .trim()
            .allow("", null)
            .optional()
            .label("First Name"),
        lastName: Joi.string()
            .trim()
            .allow("", null)
            .optional()
            .label("Last Name"),
        homePhone: Joi.string()
            .trim()
            .allow("", null)
            .optional()
            .label("Home Phone"),
        mobilePrimary: Joi.string()
            .trim()
            .allow("", null)
            .optional()
            .label("Mobile Primary"),
        relationship: Joi.string()
            .trim()
            .allow("", null)
            .optional()
            .label("Relationship"),
    }),
});

export default schema;
