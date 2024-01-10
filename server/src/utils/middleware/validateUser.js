// Internal modules
const {
    createSecretaryUserSchema,
    createDoctorUserSchema,
} = require("../schema");

const validateUser = (req, res, next) => {
    let schema;
    if (req.body.userType === "Doctor") {
        schema = createDoctorUserSchema;
    } else if (req.body.userType === "Secretary") {
        schema = createSecretaryUserSchema;
    } else {
        return res.status(400).json({ error: "Invalid user type" });
    }

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    req.body = value; // Update the request body with the sanitized data
    next();
};

module.exports = validateUser;
