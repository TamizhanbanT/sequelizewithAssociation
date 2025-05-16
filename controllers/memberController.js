// controllers/memberController.js
const { Member } = require('../models');

// 🔹 Create a single member
exports.create = async (req, res) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 🔹 Bulk create members
exports.bulkCreate = async (req, res) => {
  try {
    const members = await Member.bulkCreate(req.body);
    res.status(201).json(members);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 🔹 Get all members
exports.getAll = async (req, res) => {
  try {
    const members = await Member.findAll();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Update member by ID
exports.update = async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    await member.update(req.body);
    res.json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 🔹 Delete member by ID
exports.delete = async (req, res) => {
  try {
    const deleted = await Member.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json({ message: 'Member deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
