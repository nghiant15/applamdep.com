var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const uuid = require('uuid');
const RewardInformation = new Schema({
    Subject: {
        type: String
    },
    Content: {
        type: String
    },
    Templates: {
        type: String,
    },
    Link: {
        type: String
    },
    Company_Id: {
        type: String,
        default: null,
        ref: "CompanyPlugin"
    },  
    Create_Date: {
        type: Date,
        default: Date.now()
    },
    Status: {
        type: String,
        default: "1"
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('RewardInformation', RewardInformation, 'RewardInformation');