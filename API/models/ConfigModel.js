var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator').default;

const ConfigSchemas = new Schema({
    Key: {
        type: String
    }, 

    Value: {
        type: String
    },
    DataType: {
        type: String,
        default: "0"
    },
    Type: {
        type: String,
        default: "system"
    },

    Company_id: {
        type: String,

    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Config', ConfigSchemas, 'Config');