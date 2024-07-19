var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const uuid = require('uuid');
const CustomerRequest = new Schema({
    UserName: {
        type: String
    },
    FullName: {
        type: String
    },
    Phone: {
        type: String
    },
    Company_Id: {
        type: String,
        default: null,
        ref: "CompanyPlugin"
    },
    Status: {
        type: String,
        default: "1"
    },
    Type: {
        type: String,
        default: "0"
    },
    Email: {
        type: String,
    },
    Address: {
        type: String,
    },
    Create_Date: {
        type: Date,
        default: Date.now()
    },
    Status: {
        type: String,
        default: "0"
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('CustomerRequest', CustomerRequest, 'CustomerRequest');