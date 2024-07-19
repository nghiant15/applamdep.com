var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const TypeSDK = new Schema({
    Name: {
        type: String,
        required: true
    },
    Level: {
        type: Array
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('TypeSDK', TypeSDK, 'TypeSDK');