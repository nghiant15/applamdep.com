var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const uuid = require('uuid');
const TuVan = new Schema({
    zaloLink: {
        type: String,
        default: "" 
    },
    messengerLink: {
        type: String,
        default: "" 
    },
    status: {
        type: String,
        default: "0"
    },
    
    companyId: {
       type: String,
        default: ""
    },
   
});

module.exports = mongoose.model('TuVan', TuVan, 'TuVan');