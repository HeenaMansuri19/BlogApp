const blogModelSchema = require("../model/blogModelSchema");
const commentsModelSchema = require("../model/commentsModelSchema");
const userModelSchema = require("../model/userModelSchema");

//1 API ADDBLOG 
const addBlog = async (req, res) => {
    const id = req.params.userId;
    try {
        const addBlog = await new blogModelSchema(req.body)
        const filePath = `/uploads/${req.file.filename}`;
        addBlog.blogImage = filePath;
        try {
            addBlog.save();
            res.status(201).json({
                success: "success",
                message: "Blog is posted successfully",
                DATA: addBlog
            });
        } catch (err) {
            res.status(400).json({
                success: "failure",
                message: "error occur" + err.message
            });
        }
    } catch (err) {
        console.log(err.message)
    }
}

//2 API LIST OF THE BLOG
const getBlog = async (req, res) => {
    try {
        const existsBlog = await blogModelSchema.find();
        res.status(200).json({
            success: "success",
            message: "The displayed lists of blog are here",
            "data": existsBlog
        })
    } catch (error) {
        console.log(error.message);
    }
}

//3. API of BlogDetails
const blogDetails = async (req, res) => {
    try {
        const blogData = await commentsModelSchema.findOne({ blogId: req.params.id })
            .populate({
                path: "userId",
                select: "userName profilePic",
            })
            .populate({
                path: "blogId"
            });
        res.status(200).json({
            success: "success",
            message: "Here is the blog",
            blogData: blogData
        });
    } catch (err) {
        res.status(401).json({
            success: "failure",
            error: "Error occur" + err.message,
        });
    }
}

//4. API of blogLike
const blogLike = async (req, res) => {
    const id = req.params.id
    const { blogLikes } = req.body
    const likes = await blogModelSchema.findById(id)
    if (blogLikes === "true") {
        await likes.updateOne({ $set: { blogLikes: ++likes.blogLikes } })
        res.status(202).json({
            success: "success",
            message: "You like a blog",
            data: likes.blogLikes
        })
    } else {
        await likes.updateOne({ $set: { blogLikes: --likes.blogLikes } })
        res.status(202).json({
            success: "success",
            message: "You unliked the blog",
            data: likes.blogLikes
        })
    }
}

//5. searchBlog API
const searchBlogDetail = async (req, res) => {
    const blogTitle = req.body.blogTitle
    try {
        const query = { blogTitle: { $regex: blogTitle, $options: "i" } }
        const search = await blogModelSchema.find(query);
        if (search)
            res.status(200).json({
                success: "success",
                message: "All blogs related to search",
                data: search,
            });
    } catch (err) {
        res.status(400).json({
            success: "failure",
            error: err.message
        });
    }
};

//6. myBlog API
const myBlog = async (req, res) => {
    const id = req.params.id;
    try {
        const myBlog = await blogModelSchema.find({ userId: id })
            .populate({
                path: "userId",
                select: "userName profilePic"
            })
        res.status(200).json({
            success: "success",
            data: myBlog
        })
    } catch (err) {
        res.status(404).json({
            success: "failure",
            message: "error occured" + err.message
        })
    }
}


/////----CRUD in Blog-----////////
//1.
const editBlog = async (req, res) => {
    const id = req.params.id;
    try {
        const newBlog = await blogModelSchema.findByIdAndUpdate(id, { $set: req.body });
        newBlog.save();
        res.status(201).json({
            success: "success",
            message: "Blog edited successfully"
        })
    } catch (err) {
        res.status(400).json({
            success: "failure",
            error: err.message,
        })
    }
}

//2. deleteBlog
const deleteBlog = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteBlog = await blogModelSchema.findByIdAndDelete(id, { $set: req.body });
        deleteBlog.delete();
        res.status(201).json({
            success: "success",
            message: "Blog is deleted",
        })
    } catch (err) {
        res.status(400).json({
            success: "failure",
            error: err.message,
        });
    }
}

module.exports = {
    addBlog,
    getBlog,
    blogDetails,
    blogLike,
    searchBlogDetail,
    myBlog,
    editBlog,
    deleteBlog
}