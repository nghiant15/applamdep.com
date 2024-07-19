const mongoose = require('mongoose');

const NgogDungLogSchema = new mongoose.Schema({
    
    create_at: 
    {
        type : Date, 
        default: Date.now
    },
    voucherCode: {
        type: String,
        default: ""
    }, 
    slug: {
        type: String,
        default: "ngocdung"
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
    guildId: {
        type: String,
        default: ""
    },
    status: {
        type: String, 
        default: "Send"
    }  
}); 

module.exports = mongoose.model('NgogDungLog', NgogDungLogSchema, 'NgogDungLog');