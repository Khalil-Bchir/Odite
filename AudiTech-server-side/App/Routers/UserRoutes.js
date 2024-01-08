//user routes

const express = require ("express");
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const UserController = require('../Controllers/UserController');

const router = express.Router();

const uploadDirectory = path.join(__dirname, '../../uploads');

// create uploads directory if it does not exist
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

//upload file file
const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, uploadDirectory)
  },
  filename: (req, file, cb) =>{
    cb(null, Date.now()+ '--' +file.originalname )
  }
})

const upload = multer({ storage: storage });

router.post('/user',upload.single('file'), UserController.createUser); // Create user 
router.get('/users',UserController.getAllUsers); // Get all users 
router.get('/user/:userId',UserController.getUserById); // Get user by userId 
router.put('/user/:userId',upload.single('file'),UserController.updateUser); // Update a user 
router.delete('/user/:userId',UserController.deleteUser); // Delete a user 

module.exports = router;
