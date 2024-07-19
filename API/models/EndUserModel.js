var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator').default;

const EndUser = new Schema({
    username: {
        type: String,
    }, 
    google_id: {
        type: String,
    }, 
    email: {
        type: String,
        trim: true,
    }, 
    phone: {
        type: String,

    },
    company_id: {
        type: String
    },
    name: {
        type: String
    },
    address: {
        type: String, 
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    introduction: {
        type: String,
        default: ""
    },
    introduction: {
        type: String,
        default: ""
    },
    addressHome : {
        type: String,
        default: ""
    },
    create_date: {
        type: Date,
        default: Date.now()
    }, 
    score: {
        type: String,
        default: ""
    }, 

    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('EndUser', EndUser, 'EndUser');