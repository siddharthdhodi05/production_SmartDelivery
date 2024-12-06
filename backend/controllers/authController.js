import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generate JWT
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, 'your_jwt_secret_key', { expiresIn: '30d' });
};

// Login Controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Register Controller
export const registerUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ email, password, role });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user._id, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Logout Controller
export const logoutUser = (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};
