import Joi from "joi";

const schema = Joi.object({
    username: Joi.string().alphanum().min(3).required().label("Username"),
    password: Joi.string().trim().min(3).required().label("Password"),
});

export default schema;
