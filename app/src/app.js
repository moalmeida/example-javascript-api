'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const expressSanitizer = require('express-sanitizer');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const auth = require('./util/auth');

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(compression());
app.use(cookieParser());
app.use(expressSanitizer());
app.use(session({secret: '_example', resave: false, saveUninitialized: true, cookie: {}}));
app.use(auth.initialize());
app.use(auth.session());
app.options('*', cors())

module.exports = app;
