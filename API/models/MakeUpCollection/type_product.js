var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const TypeProduct = new Schema({
    Name: {
        type: String,
        required: true
    },
    TypeSDK: {
        type: String,
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('TypeProduct', TypeProduct, 'TypeProduct');