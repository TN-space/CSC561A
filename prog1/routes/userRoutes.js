'use strict';

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../models/user');

// API Routes
// SHOW
router.get('/api/users', function(req, res) {
    User.getUsers(function(err, users) {
        if (err) {
            throw err;
        }
        res.json(users);
    });
});

router.get('/api/users/:_id', function(req, res) {
    User.getUserById(req.params._id, function(err, user) {
        if (err) {
            throw err;
        }
        res.json(user);
    });
});

// STORE
router.post('/api/users', function(req, res) {
    var user = req.body;

    User.addUser(user, (err, user) => {
        if (err) {
            throw err;
        }

        res.json(user);
    });
});

// UPDATE
router.put('/api/users/:_id', function(req, res) {
    var user = req.body;

    const options = { returnNewDocument: true };

    User.updateUser(req.params._id, user, options, (err, user) => {
        if (err) {
            throw err;
        }

        res.json(user);
    });
});

// DESTROY
router.delete('/api/users/:_id', function(req, res) {
    User.removeUser(req.params._id, function(err, user) {
        if (err) {
            throw err;
        }
        res.json(user);
    });
});

// Web Routes
// INDEX root website/SHOW
router.get('/', function(req, res) {
    User.getUsers(function(err, users) {
        res.render('userIndex', {
            users: users
        });
    });
});

// EDIT
router.get('/users/edit/:_id', function(req, res) {
    User.getUserById(req.params._id, function(err, user) {
        if (err) {
            throw err;
        }
        res.render('userEdit', {
            user: user
        });
    });
});

// DESTROY
router.delete('/users/delete/:_id', function(req, res) {
    User.removeUser(req.params._id, function(err, user) {
        if (err) {
            throw err;
        }
        res.redirect('/');
    });
});

// STORE
router.post('/users/add', [
    check('name').not().isEmpty().withMessage('Name is a required field.'),
    check('email').not().isEmpty().withMessage('Email is a required field.'),
    check('email').isEmail().withMessage('Email field is not a valid email address.')
], function(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        User.getUsers(function(err, users) {
            res.render('userIndex', {
                users: users,
                errors: errors.array()
            });
        });
    } else {
        var newUser = {
            name: req.body.name,
            email: req.body.email
        };

        User.addUser(newUser, (err, user) => {
            if (err) {
                throw err;
            }

            res.redirect('/');
        });
    }
});

// UPDATE
router.put('/users/edit/:_id', [
    check('name').not().isEmpty().withMessage('Name is a required field.'),
    check('email').not().isEmpty().withMessage('Email is a required field.'),
    check('email').isEmail().withMessage('Email field is not a valid email address.')
], function(req, res) {
    const errors = validationResult(req);

    var newUser = {
        _id: req.params._id,
        name: req.body.name,
        email: req.body.email
    };

    if (!errors.isEmpty()) {
        res.render('userEdit', {
            user: newUser,
            errors: errors.array()
        });
    } else {
        const options = { returnNewDocument: true };
        User.updateUser(req.params._id, newUser, options, (err, user) => {
            if (err) {
                throw err;
            }

            res.redirect('/');
        });
    }
});

module.exports = router;