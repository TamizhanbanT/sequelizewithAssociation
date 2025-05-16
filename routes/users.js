var express = require('express');
var router = express.Router();
const { User } = require('../models'); // Import the User model

// GET all users
router.get('/', async function(req, res, next) {
  try {
    const users = await User.findAll(); // Fetch all users from the database
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET user by ID
router.get('/:id', async function(req, res, next) {
  const { id } = req.params;  // Extract the user ID from the URL parameters
  try {
    const user = await User.findByPk(id); // Fetch user by primary key (ID)
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);  // Send the user data as response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update user (e.g., update email or password)
router.put('/:id', async function(req, res, next) {
  const { id } = req.params;
  const { email, password } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // You could add validation here for email and password before saving

    if (email) user.email = email;  // Update email if provided
    if (password) user.password = password;  // Update password if provided

    await user.save();  // Save the updated user to the database
    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE user
router.delete('/:id', async function(req, res, next) {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.destroy();  // Delete the user from the database
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
