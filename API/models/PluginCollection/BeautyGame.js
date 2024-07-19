var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const uuid = require('uuid');
const GameModel = new Schema({
    scoreMax: {
        type: String,
        default: "" 
    },
    score: {
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

module.exports = mongoose.model('BeautyGame', GameModel, 'BeautyGame');