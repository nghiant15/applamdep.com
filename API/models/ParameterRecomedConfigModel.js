var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator').default;

const ParameterRecomedConfig = new Schema({
    Title: {
        type: String,
        trim: true
    },
    Content: {
        type: String
    },
    Level: {
        type: String,
    },
    Priorites: {
        type: String,
        default:"0"
    },
    Type: {
        type: String,
        default:"0",
        trim: true
    },
    Icon: {
        type: String,
        default: "",
    },
    
    Company_Id: {
        type: String
    },
    GroupProduct: {
        type: String,
        default: "",
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

module.exports = mongoose.model('ParameterRecomedConfig', ParameterRecomedConfig, 'ParameterRecomedConfig');