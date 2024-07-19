const mongoose = require('mongoose');

const TransactionEvoucherSchema = new mongoose.Schema({
    voucherCode: {
        type: String
    },
    skinHistory: {
        type: String,
        default: null

    },
    saleId: {
        type: String,
        default: null
    },
    relCode: {
        type: String ,
        default: null
    },
    endUser: {
        type: String ,
        default: null
    },
    fullName: {
        type: String ,
        default: null
    },
    phoneNumber: {
        type: String ,
        default: null
    },
    historyId: {

        type: String ,
        default: null
    },
    campaingId: {
        type: String ,
        default: null     
    },

    create_at: 
    {
        type : Date, 
        default: Date.now
    },
    lastUpdated:{
        type : Date, 
        default: null
    }
    ,
    create_by: {
        type: String,
        default: null
    },
    businessDate: {
        type : Date, 
        default: null
    },
    noted: {
        type: String,
        default: ""
    },
    company_id: {
        type: String
    },
    slug: {
        type: String,
        default: null
    }, 
    partner: {
        type: String, 
        default: null
    }, 
    assigneId: 
    {
        type: String,
        default: null
    },
    vendorId:{
        type: String
    },
    status: {
        type: String 
    },
    isDelete: {
        type: Boolean,
        default: false
    }
   
});

module.exports = mongoose.model('TransactionEvoucher', TransactionEvoucherSchema, 'TransactionEvoucher');