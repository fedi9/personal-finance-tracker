const pool = require('../db');
const bcrypt = require('bcryptjs');

// Get current user profile
const getProfile = async (req, res) => {
  const userId = req.user;

  try {
    const result = await pool.query('SELECT id, email FROM users WHERE id = $1', [userId]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user password
const updatePassword = async (req, res) => {
  const userId = req.user;
  const { currentPassword, newPassword } = req.body;

  try {
    const userRes = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    const user = userRes.rows[0];

    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [
      hashedPassword,
      userId,
    ]);

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProfile,
  updatePassword,
};
