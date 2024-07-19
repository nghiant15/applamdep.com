var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const uuid = require('uuid');
const PackageProduct = new Schema({
    Name: {
        type: String,
        trim: true,
        required: true
    },
    Value: {
        type: String,
        trim: true
    },
    moneyPrice: {
        type: String,
        trim: true
    },
    Unit: {
        type: String
    },
    Status: {
        type: String,
        default: "1"
    },
    Array_Feature: {
        type: Array
    },
    listFilter : {
        type: Array
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    Create_Date: { 
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('PackageProduct', PackageProduct, 'PackageProduct');