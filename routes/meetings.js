const express = require('express');
const router = express.Router();
const { Meeting, Member } = require('../models');

// Create a meeting
router.post('/', async (req, res) => {
  try {
    const data = await Meeting.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all meetings with members and pagination
// router.get('/', async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 5;
//   const offset = (page - 1) * limit;

//   try {
//     const data = await Meeting.findAndCountAll({
//       limit,
//       offset,
//       include: ['members']
//     });

//     res.json({
//       total: data.count,
//       currentPage: page,
//       totalPages: Math.ceil(data.count / limit),
//       meetings: data.rows
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Get all meetings with members and pagination
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  try {
    const data = await Meeting.findAndCountAll({
      limit,
      offset,
      include: [{
        model: Member,
        as: 'members'  // Must match the `as` used in Meeting.hasMany
      }]
    });

    res.json({
      total: data.count,
      currentPage: page,
      totalPages: Math.ceil(data.count / limit),
      meetings: data.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get a meeting by ID with members
router.get('/:id', async (req, res) => {
  try {
    const meeting = await Meeting.findByPk(req.params.id, { include: 'members' });
    if (!meeting) return res.status(404).json({ error: 'Meeting not found' });
    res.json(meeting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a meeting
router.put('/:id', async (req, res) => {
  try {
    const meeting = await Meeting.findByPk(req.params.id);
    if (!meeting) return res.status(404).json({ error: 'Meeting not found' });

    await meeting.update(req.body);
    res.json(meeting);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a meeting
router.delete('/:id', async (req, res) => {
  try {
    const meeting = await Meeting.findByPk(req.params.id);
    if (!meeting) return res.status(404).json({ error: 'Meeting not found' });

    await meeting.destroy();
    res.json({ message: 'Meeting deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
