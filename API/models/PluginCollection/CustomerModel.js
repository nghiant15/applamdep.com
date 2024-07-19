var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator').default;

const Customer = new Schema({
    FullName: {
        type: String,
        trim: true
    },
    UserName: {
        type: String
    },
    Email: {
        type: String,
    },
    Phone: {
        type: String,
        trim: true
    },
    Address: {
        type: String
    },
    Company_Id: {
        type: String,
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

module.exports = mongoose.model('Customer', Customer, 'Customer');