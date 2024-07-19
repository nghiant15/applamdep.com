var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator').default;

const Minisize = new Schema({
 
    title: {
        type:  String, 
        default: ""
    },
    slch: {
        type:  String, 
        default: ""
    },
    titleProduct: {
        type:  String, 
        default: ""
    },

    priceText: {
        type:  String, 
        default: ""
    },
    butonText: {
        type:  String, 
        default: ""
    },
    imageLink: {
        type:  String, 
        default: ""
    },

    linkRegister: {
        type:  String, 
        default: ""
    },
    slug: {
        type:  String, 
        default: "" 
    },
    minisize: {
        type:  String, 
        default: "" 
    },
    countDown : 
    {
        type:  String, 
        default: "3" 
    },
    showUp : 
    {
        type:  String, 
        default: "3" 
    }
  
});

module.exports = mongoose.model('Minisize', Minisize);