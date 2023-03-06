const joi = require("joi")
const Joi = require("joi").extend(require("@joi/date"))


const blogSchema = {
    blogValidation: joi.object({
        blogTitle: joi.string().required(),
        blogDescription: joi.string().required(),
        blogLikes: joi.string().required(),
        userId: joi.string().required(),
    }).unknown(true)
}

module.exports =
    blogSchema
