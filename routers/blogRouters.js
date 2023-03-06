const express = require('express');
const router = express.Router()
const blog = require('../controllers/blogController')
const { upload } = require('../middlewares/imageStorage');
const validation = require('../validations/user/userValidation')


router.post("/addblog/:id",upload.single("blogImage"),blog.addBlog)
router.get("/getblog",blog.getBlog)
router.get("/blogdetails/:id",blog.blogDetails)
router.patch("/blogLike/:id",blog.blogLike)
router.get("/searchBlog",blog.searchBlogDetail)
router.get("/myblog/:id",blog.myBlog)
router.patch("/editBlog/:id",blog.editBlog)
router.delete("/deleteBlog/:id",blog.deleteBlog)

module.exports = router;