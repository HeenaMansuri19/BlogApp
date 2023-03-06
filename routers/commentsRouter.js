const express = require('express');
const router = express.Router()
const comment = require('../controllers/commentsController')

router.post("/addComment/:uid/:bid",comment.addComment)

module.exports = router;