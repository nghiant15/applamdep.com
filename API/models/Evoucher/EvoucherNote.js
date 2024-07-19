const mongoose = require('mongoose');



const EvoucherNoteSchema = new mongoose.Schema({
   
    userId: {
        type: String,
        default: null
        
    },
    content: {
        type: String ,
        default: null
    },
    relId: {
        type: String ,
        default: null 
    },
    create_at: 
    {
        type : Date, 
        default: Date.now
    }
    
    
   
});

module.exports = mongoose.model('EvoucherNote', EvoucherNoteSchema, 'EvoucherNote');