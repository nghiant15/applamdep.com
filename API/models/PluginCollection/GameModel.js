var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const uuid = require('uuid');
const GameModel = new Schema({
    gameTitle: {
        type: String,
        default: "" 
    },
    poupintro: {
        type: String,
        default: "" 
    },
    pupupSuccess: {
        type: String,
        default: "" 
    },
    popupfail: {
        type: String,
        default: "" 
    },
    
    skinNumber: {
        type: String,
        default: "" 
    },
    fromtime: {
        type: String, 
        default: ""
    },
    totime: {
        type: String, 
        default: ""
    },
    fromDate: {
        type: Date,
        default: Date.now()
    },
    todate: {
        type: Date,
        default: Date.now()
    },
  
    typeGame: {
        type: String,
        default: "1"
    },
    companyId: {
       type: String,
        default: ""
    },
    des: {
        type: String,
        default: "" 
    },
    imageBannerDesktop: {
        type: String,
        default: "" 
    },
    imageBannerMobile: {
        type: String,
        default: "" 
    },
    hrefImageBannerDesktop: {
        type: String,
        default: "" 
    },
    hrefImageBannerMobile: {
        type: String,
        default: "" 
    },
    statusGame: {
        type: Boolean,
        default: false
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('GameModel', GameModel, 'GameModel');