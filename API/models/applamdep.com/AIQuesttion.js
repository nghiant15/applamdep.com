var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator').default;

const AIQuesttion = new Schema({
 
    question: {
        type:  String, 
        default: ""
    },
   
    noted: {
        type:  String, 
        default: ""
    },
    slug: {
        type:  String, 
        default: "" 
    }

  
});

module.exports = mongoose.model('AIQuesttion', AIQuesttion);