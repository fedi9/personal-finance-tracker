const pool = require('../db');

// Create a new transaction
const createTransaction = async (req, res) => {
  const userId = req.user;
  const { amount, category, type, date, note } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO transactions (user_id, amount, category, type, date, note)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [userId, amount, category, type, date, note]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all transactions for logged-in user
const getTransactions = async (req, res) => {
  const userId = req.user;

  try {
    const result = await pool.query(
      'SELECT * FROM transactions WHERE user_id = $1 ORDER BY date DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a transaction by id
const updateTransaction = async (req, res) => {
  const userId = req.user;
  const { id } = req.params;
  const { amount, category, type, date, note } = req.body;

  try {
    // Check ownership
    const check = await pool.query('SELECT * FROM transactions WHERE id = $1 AND user_id = $2', [
      id,
      userId,
    ]);
    if (check.rows.length === 0) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    const result = await pool.query(
      `UPDATE transactions SET amount=$1, category=$2, type=$3, date=$4, note=$5
       WHERE id=$6 RETURNING *`,
      [amount, category, type, date, note, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a transaction by id
const deleteTransaction = async (req, res) => {
  const userId = req.user;
  const { id } = req.params;

  try {
    // Check ownership
    const check = await pool.query('SELECT * FROM transactions WHERE id = $1 AND user_id = $2', [
      id,
      userId,
    ]);
    if (check.rows.length === 0) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    await pool.query('DELETE FROM transactions WHERE id = $1', [id]);
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
};
