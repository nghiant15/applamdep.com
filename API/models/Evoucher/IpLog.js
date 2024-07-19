const mongoose = require('mongoose');

const IpLogSchema = new mongoose.Schema({
    ip: {
        type: String,
        default: null
    },
    create_at: 
    {
        type : Date, 
        default: Date.now
    },
    regional: {
        type: String,
        default: ""
    },
    zipCode: {
        type: String,
        default: ""
    },
    voucherCode: {
        type: String,
        default: ""
    }, 

    phoneNumber: {
        type: String,
        default: ""
    },
    isDelete: {
        type: Boolean,
        default: false
    }
      
});

module.exports = mongoose.model('IpLog', IpLogSchema, 'IpLog');