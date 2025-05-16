require('dotenv').config();

const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express(); // ✅ Initialize app first

const meetingsRouter = require('./routes/meetings');
const membersRouter = require('./routes/members');
const authRouter = require('./routes/auth');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/auth', authRouter);
app.use('/meetings', meetingsRouter);
app.use('/members', membersRouter);

module.exports = app;
