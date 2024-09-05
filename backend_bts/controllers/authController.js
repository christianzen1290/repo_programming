const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { JWT_SECRET } = require('../config/config');

exports.login = (req, res) => {
  const { username, password } = req.body;

  const user = userModel.findByUsername(username);
  if (!user) return res.status(400).json({ message: 'User tidak ditemukan' });

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ message: 'Invalid password' });

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
exports.register = (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    try {
      const user = userModel.addUser(username, password);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.protected = (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
};