var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const ProductColor = new Schema({
    color_id: {
        type: String
    },
    product_id: {
        type: String,
    },
    image: {
        type: String,
    },
    Create_Date: {
        type: Date,
        default: Date.now()
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('ProductColor', ProductColor, 'ProductColor');