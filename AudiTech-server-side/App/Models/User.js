//User Model

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter a name'],
        },

        lastname: {
            type: String,
            required: [true, 'Please enter a lastname'],
        },

        email: {
            type: String,
            required: [true, 'Please enter an email'],
            unique: true
        },

        password:{
            type: String,
            required: [true, 'Please enter a password'],
        },
        
        //custom generated function
        userId: {
            type: String,
            required: true,
            unique: true
        },

        userType:{
            type: String,
            enum: ['SAD','AD'], // SAD as super-admin and AD as admin
            required:true
        },

        file:{
            type: String,
            required: false
        }
    },

    {
        timestamps: true
    }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;