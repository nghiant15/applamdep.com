var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator').default;

const Xemtuong = new Schema({
    title: {
        type:  String, 
        default: ""
    },
    title2: {
        type:  String, 
        default: ""
    },
    buttonText: {
        type:  String, 
        default: ""
    },

    content: {
        type:  String, 
        default: ""
    },
    status: {
        type:  String, 
        default: ""
    },
    image: {
        type:  String, 
        default: ""
    },
    slug: {
        type:  String, 
        default: "" 
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CompanyPlugin"
      }
  
});

module.exports = mongoose.model('Xemtuong', Xemtuong);