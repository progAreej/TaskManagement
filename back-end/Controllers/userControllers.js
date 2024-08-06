const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../Config/db'); // Ensure this is the correct path to your PostgreSQL connection

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING *',
      [name, hashedPassword, email]
    );

    res.status(201).json({ message: 'User created successfully', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'User registration failed' });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0 || !await bcrypt.compare(password, result.rows[0].password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: result.rows[0].id, email: result.rows[0].email }, 'areej123456789', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
};

// Get user profile (protected route)
const getUserProfile = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [req.user.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
