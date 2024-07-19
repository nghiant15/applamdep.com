var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator').default;
const CompanyPlugin = new Schema({
    Name: {
        type: String,
        trim: true
    },
    Email: {
        type: String,
        trim: true,
    },
    Phone: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    Fax: {
        type: String,
        trim: true
    },
    Address: {
        type: String
    },
    Slug: {
        type: String,
        unique: true
    },
    Website: {
        type: String
    },
    Res_skin: {
        type: String,
        default: 0
    },
    Res_makeup: {
        type: String,
        default: 0
    },
    Create_By: {
        type: String,
        ref: "UserPlugin"
    },
    Create_Date: {
        type: Date,
        default: Date.now()
    },
    Status: {
        type: String,
        default: "Deactived"
    },
    Type: { 
        type: String,
    },
    Sale_Id: {
        type: String,
        default: null
    },
    Code: {
        type: String
    },
    isDelete: {
        type: Boolean,
        default: false
    }     
});

module.exports = mongoose.model('CompanyPlugin', CompanyPlugin, 'CompanyPlugin');