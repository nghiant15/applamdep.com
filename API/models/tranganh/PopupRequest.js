var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator').default;

const PopupRequest = new Schema({
 
    address: {
        type:  String, 
        default: ""
    },
    fullName :  {
        type:  String, 
        default: ""
    },
   
    contentAddvice: {
        type:  String, 
        default: ""
    },
    slug: {
        type:  String, 
        default: "" 
    },
    phone : {
        type:  String, 
        default: "" 
    },
      create_date: {
        type: Date,
        default: Date.now
    }, 
  
});

module.exports = mongoose.model('PopupRequest', PopupRequest);