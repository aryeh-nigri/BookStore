const mongoose = require("mongoose");

// Post Schema
const PostSchema = mongoose.Schema(
    {
        message: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        bookId: {
            // type: mongoose.Schema.Types.ObjectId,
            type: String,
            ref: 'Book',
            required: true
        }
    },
    {
        timestamps: true
    });

const Post = (module.exports = mongoose.model("Post", PostSchema));

// Get Posts
module.exports.getPosts = (callback, limit) => {
    Post.find(callback).limit(limit);
};

// Get Posts By Id
module.exports.getPostsByBookId = (bookId, callback) => {
    Post.find({ bookId }, callback);
};

// Add Post
module.exports.addPost = (post, callback) => {
    Post.create(post, callback);
};

// Delete Post
module.exports.removePost = (id, callback) => {
    var query = { _id: id };
    Post.remove(query, callback);
};
