var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const HistoryMakeUp = new Schema({
    Phone: {
        type: String
    },
    Color: {
        type: String
    },
    Product_Id: {
        type: String,
        ref: "tb_product_makeup"
    },
    Image: {
        type: String
    },
    Company_Id: {
        type: String,
        ref: "CompanyPlugin"
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

module.exports = mongoose.model('HistoryMakeUp', HistoryMakeUp, 'HistoryMakeUp');