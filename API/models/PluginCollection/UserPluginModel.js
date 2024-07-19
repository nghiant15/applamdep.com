var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator').default;

const UserPlugin = new Schema({
    Name: {
        type: String,
        trim: true,
        required: true
    },
    Email: {
        type: String,
        trim: true,
        // validate: v => {
        //     if (!validator.default.isEmail(v)) {
        //         throw Error("Invalid Email address");
        //     }
        // }
    },
    Phone: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    Address: {
        type: String
    },
    Sale_Id: {
        type: String,
        ref: "UserPlugin"
    },
    Company_Id: {
        type: String,
        trim: true,
        ref: "CompanyPlugin"
    },
    Role_Id: {
        type: String,
        trim: true
    },
    UserName: {
        type: String,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Create_Date: {
        type: Date,
        default: Date.now()
    },
    Message_Code: {
        type: String
    },
    isSale: {
        type: Boolean
    },
    Discount: {
        type: Number
    },
    Status: {
        type: String,
        default: "Actived"
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('UserPlugin', UserPlugin, 'UserPlugin');