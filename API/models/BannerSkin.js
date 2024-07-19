var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator').default;

const BannerSkin = new Schema({
   hrefLink: {
        type: String,

    },
    name: {
        type: String
    },
    countSkin: {
        type: String,
        default: "0"
    },
    des: {
        type: String, 
        default: ""
    },


   
    create_date: {
        type: Date,
        default: Date.now()
    }, 
    isActive: {
        type: Boolean,
        default: true
    }
    ,
    isDelete: {
        type: Boolean,
        default: false
    },
    image_link: {
        type:  String, 
        default: ""
    },
    image_mobile_link: {
        type:  String, 
        default: ""
    }
});

module.exports = mongoose.model('BannerSkin', BannerSkin);