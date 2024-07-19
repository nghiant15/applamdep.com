const mongoose = require('mongoose');



const EvoucherSchema = new mongoose.Schema({
    code: {
        type: String
    },
    relCode: {
        type: String ,
        default: null
    },
    from: {
        type: Date, 
        default: null
    },
    to: {
        type: Date,
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
    },
    status: {
        type: String,
        default: "D"
    }
    ,
    create_by: {
        type: String
    },
    content: {
        type: String,
        default : ""
    },
    region: {
        type: String,
        default : ""
    },
    title:  {
        type: String,
        default : ""
    },
    condition: {
        type: String,
        default : ""
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    company_id: {
        type: String
    },
    historyId: {
        type: String,
        default : null
    }
   
});

module.exports = mongoose.model('Evoucher', EvoucherSchema, 'Evoucher');