'use strict';

// HTTPS
const fs = require('fs');
const https = require('https');
const privateKey = fs.readFileSync('/etc/ssl/private/server_key.key', 'utf8');
const certificate = fs.readFileSync('/etc/ssl/private/server_cert.cer', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const morgan = require('morgan');
const winston = require('./config/winston');

// Global Vars
app.use(function(req, res, next) {
    res.locals.errors = null;
    next();
});

// Support parsing of application/json type post data
app.use(bodyParser.json());

// Support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // Look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// Serve static files(css) from the "public" directory - so that css can run
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Logs
app.use(morgan('combined'));
app.use(morgan('combined', { stream: winston.stream }));

// Connect to MongoDB on VM
mongoose.connect('mongodb://10.92.130.1:27017/blogger', { useNewUrlParser: true });
const db = mongoose.connection;

// Import user routes
const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);

// Import blog routes
const blogRoutes = require('./routes/blogRoutes');
app.use('/', blogRoutes);

// Start the HTTPS server
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(8443, () => {
    console.log('Running on port 8443...');
});