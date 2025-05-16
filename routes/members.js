const express = require('express');
const router = express.Router();
const controller = require('../controllers/memberController');

// 🔹 Create a single member
router.post('/', controller.create);

// 🔹 Bulk create members
router.post('/bulk', controller.bulkCreate);

// 🔹 Get all members
router.get('/', controller.getAll);

// 🔹 Update member by ID
router.put('/:id', controller.update);

// 🔹 Delete member by ID
router.delete('/:id', controller.delete);

module.exports = router;
