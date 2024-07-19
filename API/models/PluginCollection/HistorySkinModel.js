var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const uuid = require('uuid');
const HistorySkin = new Schema({
    UserName: {
        type: String
    },
    Result: {
        type: String
    },
    regionName: {
        type: String,
        default: "" 
    },
    saleName: {
        type: String,
        default: "" 
    },
    saleType:  {
        type: String,
        default: "" 
    },
    saleId2: {
        type: String,
        default: "" 
    },
    ipClient: {
        type: String,
        default: "" 
    },
    dataCheckRegion: {
        type: Object,
        default: null 
    },
    User_Id: {
        type: String,
        ref: "EndUser"
    },
    Phone: {
        type: String
    },
    Create_Date: {
        type: Date,
        default: Date.now()
    },
    Image: {
        type: String
    },
    Company_Id: {
        type: String,
        ref: "CompanyPlugin"
    },
    successGame: {
        type: Boolean,
        default: false
    }, 
    Sale_Id: {
        type: String,
        ref: "UserPlugin"
    },
    typeLogin: {
        type: String,
        default : null 
    },
    gameType: {
        type: String,
        default : null 
    },
    companyName: {
        type: String,
        default : null 
    },
    isDelete: {
        type: Boolean,
        default: false
    }, 
    gameJoinType1: {
        type: Boolean,
        default: false
    },
     location: {
        type: String, 
        default: "" 

     },  
     connectionType:  {
        type: String, 
        default: "" 
     },
     timeConnection: {
        type: Date,
        default: Date.now()
    },
    minisizeClick:  {
        type: String, 
        default: "" 
     },
     timeminisizeClick: {
        type: Date,
        default: Date.now()
    },
     
     score: {
        type: String, 
        default: "" 

     },

     ageGame: {
       type: String, 
       default: "" 

     },
     ageGameReal: {
        type: String, 
        default: "" 
 
      }
});

module.exports = mongoose.model('HistorySkin', HistorySkin, 'HistorySkin');