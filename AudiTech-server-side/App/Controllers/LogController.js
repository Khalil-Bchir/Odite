//LogController

const User = require ('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParserer = require ('cookie-parser');
const { generateToken } = require('../../utils/JWT');

const LogController = {};

// Login
LogController.login = async (req, res) => {
  try {
    // Check if email exists in the request body
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Extract email and password from the request body
    const { email, password } = req.body;

    // Check if email exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }else{

        // Generate a token
        const accessToken = generateToken(user);

        res.cookie('Access Token', accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        });

        return res.status(200).json('Logged in successfully');
    };
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// Logout
LogController.logout = (req, res) => {
  res.clearCookie('Access Token', {
    maxAge: 0,
    httpOnly: true,
    secure: true,
    sameSite: 'none'
});
  res.status(200).json({ message: 'Logged out' });
};

module.exports = LogController;

