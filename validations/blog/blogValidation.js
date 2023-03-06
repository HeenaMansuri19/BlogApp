const compModelSchema = require("../../models/compModelSchema")
const blogSchema = require("./blog_Schema")
const company = require("./company_schema")

module.exports = {
    addBlogValidation: async (req, res, next) => {
        const value = await blogSchema.blogValidation.validate(req.body,{abortEarly:false})
        if (value.error) {
            res.json({
                succes: 0,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    }
}