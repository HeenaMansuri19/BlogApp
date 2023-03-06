const commentsModelSchema = require("../model/commentsModelSchema");

const addComment = async (req, res) => {
    try {
        let body = { ...req.body, userId: req.params.uid, blogId: req.params.bid }
        const comment = await new commentsModelSchema(body);
        await comment.populate({
            path: "userId",
            select: "userName profilePic"
        });
        let comm = await comment.save();
        res.status(201).json({
            success: "success",
            message: "Comment added successfully",
            addComment: comm,
        });
    } catch (err) {
        res.status(400).json({
            success: "failure",
            message: "Error occur" + err,
        });
    }
}

module.exports = {
    addComment
}