const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId


const CampaignSchema = new mongoose.Schema({
   
    name: {
        type: String
    },
    from: {
        type: Date, 
        default: null
    },
    to: {
        type: Date,
        default: null
    },
    create_at: 
    {
        type : Date, 
        default: Date.now
    },
    lastUpdated:{
        type : Date, 
        default: null
    }
    ,
    create_by: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default : ""
    },
    region: {
        type: String,
        default : ""
    },
    code: {
        type: String,
        default : ""
    },
    status: {
        type: String,
        default: "D"
    },
    saleEndDate: {
        type : Date, 
        default:null
    },
    vendorId: {
        type:  ObjectId,
        default: ""
    },
    
    isDelete: {
        type: Boolean,
        default: false
    },
    company_id: {
        type: String
    },
    check_in: {
        type: String,
        default: ""
    },
    quantity: {
        type: Number,
        default : ""

    },
    noted: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('Campaign', CampaignSchema, 'Campaign');