//CompanySheet Model

const mongoose = require('mongoose');

const CompanySheetSchema = new mongoose.Schema(
    {
        //custom generated function
        companySheetId: {
            type: String,
            required: true,
            unique: true
        },

        companyName: {
            type: String,
            required: [true, 'Please enter the company name'],
            unique: true
        },

        address: {
            type: String,
            required: [true, 'Please enter an address'],
        },

        activityArea: {
            type: String,
            required: [true, 'Please enter the activity area'],
        },

        legalRepresentative:{
            type: String,
            required: [true, 'Please enter the legal representative'],
        },

        email:{
            type: String,
            required: [true, 'Please enter the email'],
        },

        phone:{
            type: String,
            required: [true, 'Please enter the phone number'],
        },


        numberOfEmployees:{
            type: Number,
            required: [true, 'Please enter the number of employees'],
        },
              },

    {
        timestamps: true
    }
);

const CompanySheet = mongoose.model('CompanySheet', CompanySheetSchema);
module.exports = CompanySheet;