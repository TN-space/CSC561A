'use strict';

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../models/user');
const Blog = require('../models/blog');

// API Routes
// SHOW
router.get('/api/blogs', function(req, res) {
    Blog.getBlogs(function(err, blogs) {
        if (err) {
            throw err;
        }
        res.json(blogs);
    });
});

router.get('/api/blogs/:_id', function(req, res) {
    Blog.getBlogById(req.params._id, function(err, blog) {
        if (err) {
            throw err;
        }
        res.json(blog);
    });
});

// ADD
router.post('/api/blogs', function(req, res) {
    var blog = req.body;

    Blog.addBlog(blog, (err, blog) => {
        if (err) {
            throw err;
        }
        res.json(blog);
    });
});

// // UPDATE
// router.put('/api/users/:_id', function(req, res) {
//     var user = req.body;

//     const options = { returnNewDocument: true };

//     User.updateUser(req.params._id, user, options, (err, user) => {
//         if (err) {
//             throw err;
//         }

//         res.json(user);
//     });
// });

// // DESTROY
// router.delete('/api/users/:_id', function(req, res) {
//     User.removeUser(req.params._id, function(err, user) {
//         if (err) {
//             throw err;
//         }
//         res.json(user);
//     });
// });

// Web Routes
// blogINDEX website/SHOW
router.get('/blogs', function(req, res) {
    Blog.getBlogs(function(err, blogs) {
        User.getUsers(function(err, users) {
            res.render('blogIndex', {
                blogs: blogs,
                users: users,
                errors: []
            });
        });
    });
});

// // EDIT
router.get('/blogs/edit/:_id', function(req, res) {
    Blog.getBlogById(req.params._id, function(err, blog) {
        User.getUsers(function(err, users) {
            if (err) {
                throw err;
            }
            res.render('blogEdit', {
                blog: blog,
                users: users,
                errors: []
            });
        })
    });
});

// // DESTROY
router.delete('/blogs/delete/:_id', function(req, res) {
    Blog.removeBlog(req.params._id, function(err, blog) {
        if (err) {
            throw err;
        }
        res.redirect('/blogs');
    });
});

// ADD
router.post('/blogs/add', [
    check('title').not().isEmpty().withMessage('Title is a required field.'),
    check('body').not().isEmpty().withMessage('Body is a required field.'),
    check('author').not().isEmpty().withMessage('Author is a required field.'),
    check('comment').not().isEmpty().withMessage('Comment is a required field.'),
    check('category').not().isEmpty().withMessage('Category is a required field.')
], function(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        User.getUsers(function(err, users) {
            if (err) {
                throw err;
            }
            res.render('blogIndex', {
                users: users,
                blogs: [],
                errors: errors.array()
            });
        });
    } else {
        var newBlog = {
            title: req.body.title,
            body: req.body.body,
            slug: req.body.slug,
            author: req.body.author,
            comments: [{ 'comment': req.body['comment'], 'user_id': req.body.author}],
            category: [{ 'name': req.body['category']}]
        };

        Blog.addBlog(newBlog, (err, blog) => {
            if (err) {
                throw err;
            }
            res.redirect('/blogs');
        });
    }
});

// // UPDATE
router.put('/blogs/edit/:_id', [
    check('title').not().isEmpty().withMessage('Title is a required field.'),
    check('body').not().isEmpty().withMessage('Body is a required field.'),
    check('author').not().isEmpty().withMessage('Author is a required field.')
], function(req, res) {
    const errors = validationResult(req);

    var newBlog = {
        _id: req.params._id,
        title: req.body.title,
        body: req.body.body,
        slug: req.body.slug,
        author: req.body.author
    };

    User.getUsers(function(err, users) {
        if (!errors.isEmpty()) {
            res.render('blogEdit', {
                blog: newBlog,
                users: users,
                errors: errors.array()
            });
        } else {
            const options = { returnNewDocument: true };
            Blog.updateBlog(req.params._id, newBlog, options, (err, blog) => {
                if (err) {
                    throw err;
                }
                res.redirect('/blogs');
            });
        }
    });
});

module.exports = router;