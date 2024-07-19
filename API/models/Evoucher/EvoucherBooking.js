const mongoose = require('mongoose');



const EvoucherBookingSchema = new mongoose.Schema({
   
    transactionId: {
        type: String,
        default: null
        
    },
    status: {
        type: String ,
        default: null
    },
    noted: {
        type: String ,
        default: null
    },
    bussinessTime: {
        type : Date, 
        default: null
    },
    create_at: 
    {
        type : Date, 
        default: Date.now
    },
    company_id: 
    {
        type: String ,
        default: null  
    }
    
    
    
   
});

module.exports = mongoose.model('EvoucherBooking', EvoucherBookingSchema, 'EvoucherBooking');