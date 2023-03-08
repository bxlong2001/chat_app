const Joi = require('joi')

const validateBody = (schema) => {
    return (req, res, next) => {
        const validatorResult = schema.validate(req.body)

        console.log(validatorResult);
        if(validatorResult.error) {
            return res.status(400).json({success: false, message: validatorResult.error.details[0].message})
        }
        next()
    }
}

const schemas = {
    loginSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required()
    })
}

module.exports = {
    validateBody,
    schemas,
  };