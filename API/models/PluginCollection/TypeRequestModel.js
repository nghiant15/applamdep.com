var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const TypeRequest = new Schema({
    Value: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    Description: {
        type: String,
        unique: true,
        required: true
    },
    Create_Date: {
        type: Date,
        default: Date.now()
    },
    Status: {
        type: String,
        default: "1"
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('TypeRequest', TypeRequest, 'TypeRequest');