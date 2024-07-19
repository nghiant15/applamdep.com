var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const PluginOrder = new Schema({
    Company_Id: {
        type: String,
        trim: true,
        required: true,
        ref: "CompanyPlugin"
    },
    Package_Id: {
        type: String,
        trim: true,
        required: true,
        ref: "PackageProduct"
    },
    Sale_Id: {
        type: String,
        trim: true,
        ref: "UserPlugin"
    },
    Array_Feature: {
        type: Array
    },
    Active_Date: {
        type: Date
    },
    End_Date: {
        type: Date
    },
    Status: {
        type: String,
        default: "0"
    },
    Create_Date: { 
        type: Date,
        default: Date.now()
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('PluginOrder', PluginOrder, 'PluginOrder');