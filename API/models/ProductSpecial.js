var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator').default;

const ProductSpecial = new Schema({
   hrefLink: {
        type: String,

    },
    company_id: {
        type: String
    },
    name: {
        type: String
    },
    des: {
        type: String, 
        default: ""
    },
   
    create_date: {
        type: Date,
        default: Date.now()
    }, 

    isDelete: {
        type: Boolean,
        default: false
    },
    image_link: {
        type:  String, 
        default: ""
    }
});

module.exports = mongoose.model('ProductSpecial', ProductSpecial);