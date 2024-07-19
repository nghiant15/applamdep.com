var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const RoleSubAdmin = new Schema({
    user_id: {
        type: String
    },
    sidebar_id: {
        type: Array
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('RoleSubAdmin', RoleSubAdmin, 'RoleSubAdmin');