var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const RolePlugin = new Schema({
    Name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    Type: {
        type: String,
        unique: true,
        required: true
    },
    Create_Date: {
        type: Date,
        default: Date.now()
    },
    Array_Role: {
        type: Array
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

module.exports = mongoose.model('RolePlugin', RolePlugin, 'RolePlugin');