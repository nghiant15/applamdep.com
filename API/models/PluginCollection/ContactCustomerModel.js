var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator').default;
const ConteactCustomer = new Schema({
    Name: {
        type: String,
        trim: true,
        required: true
    },
    Phone: {
        type: String,
        trim: true,
        required: true
    },
    Type_Request: {
        type: String,
        ref: "TypeRequest"
    },
    Create_Date: {
        type: Date,
        default: Date.now()
    },
    Status: {
        type: String,
        default: "0"
    },
    Content: { 
        type: String,
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('ConteactCustomer', ConteactCustomer, 'ConteactCustomer');