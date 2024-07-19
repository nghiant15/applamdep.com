var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const ViewMiddelWare = new Schema({
    slug: {
        type: String
    },
    virtual: {
        type: String
    },
    real: {
        type: String
    },
    type: {
        type: String
    },
    isChange: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('ViewMiddelWare', ViewMiddelWare, 'ViewMiddelWare');