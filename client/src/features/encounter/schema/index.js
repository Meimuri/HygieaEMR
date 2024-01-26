import Joi from "joi";

const schema = Joi.object({
    date: Joi.date().required().label("Date"),
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
        .label("Class"),
    status: Joi.string()
        .trim()
        .valid("Planned", "Arrived", "In Progress", "Finished", "Cancelled")
        .required()
        .label("Status"),
    reasonForVisit: Joi.string()
        .trim()
        .allow("", null)
        .optional()
        .label("Reason for visit"),
    chiefComplaint: Joi.string()
        .trim()
        .allow("", null)
        .optional()
        .label("Chief Complaint"),
    notes: Joi.string().trim().allow("", null).optional().label("Notes"),
    locationId: Joi.number().integer().required().label("Location Id"),
    doctorId: Joi.number().integer().required().label("Doctor Id"),
});

export default schema;
