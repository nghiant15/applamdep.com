var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator').default;

const Book = new Schema({
   hrefLink: {
        type: String,
        default: ""

    },
    image:  {
        type: String,
        default: ""

    },
    linkCover: {
        type: String,
        default: ""

    },
    linkFiePdf: {
        type: String,
        default: ""
    },
    filepdf_link:{
        type: String,
        default: ""
    },
    categoryId: {
        type: String,
        default: ""
    },
    des: {
        type: String, 
        default: ""
    },
    companyid :{
        type: String, 
        default: ""
    },
    code: {
        type: String, 
        default: ""
    },
    title: {
        type: String, 
        default: ""
    },
    slug: {
        type: String, 
        default: ""
    },
    title2: {
        type: String, 
        default: ""
    },
    author: {
        type: String, 
        default: ""
    },
    extraInfo: {
        type: String, 
        default: ""
    },
    create_date: {

        type: Date,
        default: Date.now()
    }, 
    status: {
        type: Boolean,
        default: true
    }
    ,
    isDelete: {
        type: Boolean,
        default: false
    }
    ,
    dowload:  {
        type: String,
        default: ""
    }
  
});

module.exports = mongoose.model('Books', Book);