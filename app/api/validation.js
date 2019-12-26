//<-------------------validation------------------------>
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(8).required(),
        email: Joi.string().min(8).required().email(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        password: Joi.string().min(8).required(),
        phoneNumber: Joi.string().min(8).required(),
        gender: Joi.boolean()
        //dateOfBirth: Joi.date().format('YYYY-MM-DD').utc().required()
    });
    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(8).required(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(data);
}

const updateInfoValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(8).required(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        phoneNumber: Joi.string().min(8),
        isAuthor: Joi.boolean(),
        gender: Joi.boolean()
    });
    return schema.validate(data);
}

const updatePasswordValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(8).required(),
        oldPassword: Joi.string().min(8).required(),
        newPassword: Joi.string().min(8).required()
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.updateInfoValidation = updateInfoValidation;
module.exports.updatePasswordValidation = updatePasswordValidation;