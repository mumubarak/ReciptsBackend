const Joi = require('joi');


module.exports.validateLogin = function (query) {
    const schema = {
        language: Joi.string().optional().default("en")
    };
    return Joi.validate(query, schema, { allowUnknown: true });
};
