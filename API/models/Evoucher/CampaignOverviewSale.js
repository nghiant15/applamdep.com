const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId


const CampaignOverviewSchema = new mongoose.Schema({
    name: {
        type: String
    },
    campaignId: {
        type:  ObjectId,
        default: ""

    },
    saleId: {
        type:  ObjectId,
        default: ""

    },
    from: {
        type: Date, 
        default: null
    },
    to: {
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
    ,
    slug: {
        type: String,
        default: null
    },
    saleSlug: {
        type: String,
        default: null
    }
    
});

module.exports = mongoose.model('CampaignOverviewSale', CampaignOverviewSchema, 'CampaignOverviewSale');