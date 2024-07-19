var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator').default;

const MailQueue = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        // validate: v => {
        //     if (!validator.default.isEmail(v)) {
        //         throw Error("Invalid Email address");
        //     }
        // }
    }, 
    user_id: {
        type: String
    },

    type: {
        type: String,
        default: "0"
    },
    code: {
        type: String,
        required: true
    },
    isSend: {
        type: Boolean,
        default: false
    },
    isUsed: {
        type: Boolean,
        default: false
    },
    create_date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('MailQueue', MailQueue, 'MailQueue');