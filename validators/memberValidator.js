const { body } = require('express-validator');

exports.createMember = [
  body('name').isString().notEmpty(),
  body('meetingRole').isString().notEmpty()
];

exports.updateMember = [
  body('name').optional().isString().notEmpty()
];
