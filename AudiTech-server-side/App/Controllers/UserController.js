//UserController

const User = require ('../Models/User');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const {generateCustomId} = require('../../utils/GenerateIDUser');

const UserController = {};

// Create user
UserController.createUser = async (req, res) => {
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Get the current year as a 2-digit string (e.g. "21" for 2021)
    const year = new Date().getFullYear().toString().slice(-2);

    // Get the number of existing users of the same userType
    const count = await User.countDocuments({ userType: req.body.userType });

    // Generate a custom ID for the new user
    const customId = generateCustomId(year, req.body.userType, count + 1);

    // Create a new user
    const { filename } = req.file;
    const newUser = new User({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
      userId: customId,
      userType: req.body.userType,
      file : filename
    });

    const savedUser = await newUser.save();

    res.status(201).json({ savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//get All users
UserController.getAllUsers = async (req, res) =>{
  try{
      const users = await User.find();
      res.status(200).json(users);
  }catch(error){
      console.log(error.message);
      res.status(500).json( {message: error.message});
  }
};

// Get user by userId
UserController.getUserById = async (req, res) =>{
  try{
      const userId = req.params.userId;
      const user = await User.findOne({ userId: userId });
      res.status(200).json(user);
  }catch(error){
      console.log(error.message);
      res.status(500).json( {message: error.message});
  }
};

// Update user
UserController.updateUser = async (req, res) => {
  try {
    // Find user by userId
    const userId = req.params.userId;
    const user = await User.findOne({ userId: userId });

    // If user not found, return 404 Not Found response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user data
    user.name = req.body.name || user.name;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;

    // If password is provided, hash it and update it
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    // If file is provided, update it and move file to upload directory
    if (req.file) {
      const { filename } = req.file;

      // Remove old file file from upload directory
      const oldfile = user.file;
      if (oldfile) {
        const filePath = path.join(__dirname, '../../uploads', oldfile);
        await fs.promises.unlink(filePath);
      }

      // Update user's file field with the new filename
      user.file = filename;

      // Move new file to upload directory
      const sourcePath = path.join(__dirname, '../../uploads', filename);
      const destPath = path.join(__dirname, '../../uploads', filename);
      await fs.promises.rename(sourcePath, destPath);
    }

    // Save updated user to database
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// Delete user

UserController.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find user by userId
    const user = await User.findOneAndDelete({ userId: userId });

    // If user not found, return 404 Not Found response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove user's file file from upload directory
    const oldfile = user.file;
    if (oldfile) {
      const filePath = path.join(__dirname, '../../uploads', oldfile);
      await fs.promises.unlink(filePath);
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = UserController;