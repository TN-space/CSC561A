const { call } = require('body-parser');
const mongoose = require('mongoose');

// Comment Schema
const commentSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    approved:{
        type: Boolean,
        default: false
    },
    created_at:{
        type: Date,
        default: Date.now
    }
});

// Category Schema
const categorySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    }
});

// Blog Schema
const blogSchema = mongoose.Schema({
	title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: false
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    comments: [commentSchema],
    category: [categorySchema]
});

const Blog = module.exports = mongoose.model('Blog', blogSchema);

// Get All blog posts - find method
module.exports.getBlogs = (callback, limit) => {
    Blog.find(callback).limit(limit).populate('author');
}

// Get blog - findById method
module.exports.getBlogById = (id,callback)=>{
	Blog.findById(id, callback).populate('author');
};

// Add blog - create method
module.exports.addBlog = (blog, callback)=>{
	Blog.create(blog, callback)
};

// Update blog - findOneAndUpdate method
module.exports.updateBlog = (id, blog, settings, callback) => {
	const blogObj = {_id : id}
    const update = {
        title: blog.title,
        body: blog.body,
        slug: blog.slug,
        author: blog.author
    }
	Blog.findOneAndUpdate(blogObj, update, settings, callback)
};

// Delete blog - deleteOne method
module.exports.removeBlog = (id, callback) =>{
	const blogObj = {_id : id}
	Blog.deleteOne(blogObj, callback)
};
