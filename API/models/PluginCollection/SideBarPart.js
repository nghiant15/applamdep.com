var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const SideBarPart = new Schema({
    key: {
        type: String
    },
    value: {
        type: Array
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('SideBarPart', SideBarPart, 'SideBarPart');