const express = require('express');
const router = express.Router();
const { Member } = require('../models');

// 🔹 Create a single member
router.post('/', async (req, res) => {
  try {
    const data = await Member.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Bulk create members
router.post('/bulk', async (req, res) => {
  try {
    const data = await Member.bulkCreate(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Get all members
router.get('/', async (req, res) => {
  try {
    const data = await Member.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Update member by ID (partial update allowed)
router.put('/:id', async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    await member.update(req.body); // Only updates provided fields
    res.json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Delete member by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Member.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json({ message: 'Member deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
