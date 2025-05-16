const { body } = require('express-validator');

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

const createMeeting = [
  body('meetingRole').notEmpty().withMessage('Meeting role is required'),
  body('meetingDate').isDate().withMessage('Valid meeting date is required'),
  body('startTime')
    .matches(timeRegex)
    .withMessage('Start time must be in HH:mm:ss format'),
  body('endTime')
    .matches(timeRegex)
    .withMessage('End time must be in HH:mm:ss format')
];

module.exports = { createMeeting };
