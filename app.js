require('dotenv').config();

const express = require('express');
const path = require('path');
const logger = require('morgan');

const meetingsRouter = require('./routes/meetings');
const membersRouter = require('./routes/members');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/meetings', meetingsRouter);
app.use('/members', membersRouter);

module.exports = app;
