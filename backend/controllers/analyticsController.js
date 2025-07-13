const pool = require('../db');

const getSummary = async (req, res) => {
  const userId = req.user;

  try {
    const result = await pool.query(
      `
      SELECT 
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
      FROM transactions
      WHERE user_id = $1
      `,
      [userId]
    );

    const { total_income, total_expense } = result.rows[0];
    const income = parseFloat(total_income) || 0;
    const expense = parseFloat(total_expense) || 0;

    res.json({
      income,
      expense,
      balance: income - expense,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getSummary,
};
