const mongoose = require('mongoose');

const SmsLogSchema = new mongoose.Schema({
   
    create_at: 
    {
        type : Date, 
        default: Date.now
    },
    voucherCode: {
        type: String,
        default: ""
    }, 
    template: {
        type: String,
        default: ""
    },
    bodyRequest: {
        type: Object, 
        default: ""

    },
    dataReponse:  {
        type: Object, 
        default: ""
    },
    phoneNumber: {
        type: String,
        default: ""
    },
    relCode: {
        type: String,
        default: ""
    },
    slug: {
        type: String, 
        default: ""
    }, 
    status: {
        type: String, 
        default: "Send"
    }  
}); 

module.exports = mongoose.model('SmsLog', SmsLogSchema, 'SmsLog');