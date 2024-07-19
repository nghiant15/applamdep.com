const mongoose = require('mongoose');



const CollaboratorsSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        
    }, 
    company_id: {
        type: String, 
        default: null 
    },
    email: {
        type: String,
        default: null
    }, 
    phone: {
        type: String,
        default: null

    },
     partnerID: {
        type: String,
        default: null
    }, 
    name: {
        type: String
    },
    address: {
        type: String, 
        default: ""
    },
    password: {
        type: String,
        default: null
    },
    introduction: {
        type: String,
        default: ""
    },
    
    addressHome : {
        type: String,
        default: ""
    },
    create_date: {
        type: Date,
        default: Date.now()
    },
    relCode: {
        type: String,
        default: null
    },
    saleGroup: {
        type: String,
        default: null
    },

    isDelete:  
    {
        type: Boolean,
        default: false
    },
    isManager: {
        type: Boolean,
        default: false
    },
    tikitechCreate: {
        type: Boolean,
        default: false
    },
    logoPG : {
        type: String,
        default: null
    }
   
});

module.exports = mongoose.model('Collaborators', CollaboratorsSchema, 'Collaborators');