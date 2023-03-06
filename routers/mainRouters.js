const express = require('express');
const routers = express.Router()
const user = require('./userRouter')
const blog = require('./blogRouters')
const comment = require('./commentsRouter')

routers.use('/user', user)
routers.use('/blog',blog)
routers.use('/comment',comment)

module.exports = routers