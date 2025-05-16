const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/auth'); // ✅ no destructuring
const controller = require('../controllers/meetingController');
const { createMeeting } = require('../validators/meetingValidator');
const { validationResult } = require('express-validator');

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.post(
  '/',
  authenticateToken,
  createMeeting,
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
       return res.status(422).json({ errors: errors.array() });
    }
    return controller.create(req, res);
  }
);

router.put('/:id', authenticateToken, controller.update);

router.delete('/:id', authenticateToken, controller.delete);

module.exports = router;
