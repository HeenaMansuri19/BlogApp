const mongoose = require('mongoose')
const commentsModelSchema = new mongoose.Schema(
    {
        blogComment: {
            type: String,
            required: true
        },

        userId: {
            type: String,
            required: true
        },

        blogId: {
            type: String,
            required: true
        },

        isActive: {
            type: String,
            required: true,
            default: true
        },
    })
    
commentsModelSchema.set('timestamps', true)
module.exports = mongoose.model('comments', commentsModelSchema)