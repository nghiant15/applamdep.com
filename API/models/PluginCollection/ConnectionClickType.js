var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const uuid = require('uuid');
const ConnectionClickType = new Schema({
    
    Company_Id: {
        type: String,
    },
     connectionType:  {
        type: String, 
        default: "" 
     },
     location:  {
        type: String, 
        default: "" 
     },
     timeConnection: {
        type: Date,
        default: Date.now()
    }
     
});

module.exports = mongoose.model('ConnectionClickType', ConnectionClickType, 'ConnectionClickType');