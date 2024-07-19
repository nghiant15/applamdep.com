var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const uuid = require('uuid');
const RewardTrans = new Schema({
    Phone: {
        type: String
    },
    Reward_Id: {
        type: String
    },
    Company_Id: {
        type: String,
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

module.exports = mongoose.model('RewardTrans', RewardTrans, 'RewardTrans');