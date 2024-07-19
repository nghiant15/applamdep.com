const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId


const CheckInSchema = new mongoose.Schema({

        campaignId: {
            type:  ObjectId,
            default: ""
        },
        rateCheckIn: 
        {
            type : String, 
            default: ""
        },
        create_at: 
        {
            type : Date, 
            default: Date.now
        },
        lastUpdated:{
            type : Date, 
            default: null
        }, 
        voucheredCount: {
            type: Number, 
            default: 0,
        },
        totalVoucher: {
            type: Number, 
            default: 0,
        },
        vendorId: {
            type:  ObjectId,
            default: ""
        }
});

module.exports = mongoose.model('CheckIn', CheckInSchema, 'CheckIn');