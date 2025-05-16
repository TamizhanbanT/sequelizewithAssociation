


// controllers/meetingController.js
const { Meeting, Member } = require('../models');
console.log("mmmm",Meeting);
// GET all meetings
exports.getAll = async (req, res) => {
  try {
    const meetings = await Meeting.findAll({
      include: {
        model: Member,
        as: 'members'
      }
    });
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET meeting by ID
exports.getById = async (req, res) => {
  try {
    const meeting = await Meeting.findByPk(req.params.id, {
      include: {
        model: Member,
        as: 'members'
      }
    });

    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    res.json(meeting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a meeting
exports.create = async (req, res) => {
  try {
    const {meetingRole,meetingDate,startTime,endTime} = req.body;
    console.log(meetingRole,meetingDate,startTime,endTime);
    const meeting = await Meeting.create({meetingRole,meetingDate,startTime,endTime});
    console.log(meeting);
    res.status(201).json(meeting);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// UPDATE a meeting
exports.update = async (req, res) => {
  try {
    const meeting = await Meeting.findByPk(req.params.id);
    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    await meeting.update(req.body);
    res.json(meeting);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE a meeting
exports.delete = async (req, res) => {
  try {
    const meeting = await Meeting.findByPk(req.params.id);
    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    await meeting.destroy();
    res.json({ message: 'Meeting deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
