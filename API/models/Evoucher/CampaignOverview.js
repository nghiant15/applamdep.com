const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId


const CampaignOverviewSchema = new mongoose.Schema({
    name: {
        type: String
    },
    campaignId: {
        type:  ObjectId,
        default: null

    },
    from: {
        type: Date, 
        default: null
    },

    totalVoucher: {
        type: Number, 
        default: 0
    },
    countVoucher: {
        type: Number, 
        default: 0
    },
    
    voucheredCount: {
        type: Number, 
        default: 0
    },

    rateCheckIn: {
        type: Number , 
        default: 0
    },

    vendorName: {

        type: String, 
        default: ""
    },
    status: {
        type: String,
        default: ""
    }
    
});

module.exports = mongoose.model('CampaignOverview', CampaignOverviewSchema, 'CampaignOverview');