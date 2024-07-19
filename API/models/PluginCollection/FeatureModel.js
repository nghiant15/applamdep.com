var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const uuid = require('uuid');
const Feature = new Schema({
    Key: {
        type: String,
        trim: true,
        unique: true
    },
    Value: {
        type: String,
        trim: true
    },
    Status: {
        type: String,
        default: "1"
    },
    Type: {
        type: String,
        default: "0"
    },
    Image: {
        type: String,
        default: "https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Feature', Feature, 'Feature');