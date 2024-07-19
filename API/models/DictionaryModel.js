var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator').default;

const Dictionary = new Schema({
    key: {
        type: String
    }, 

    type: {
        type: String
    },

    id_type: {
        type: String,
    }
});

module.exports = mongoose.model('Dictionary', Dictionary, 'Dictionary');