var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator').default;

const BannerSchemas = new Schema({
    banner: {
        type: String
    }, 

    sub_banner: {
        type: String
    },

    company_id: {
        type: String,
    }
});

module.exports = mongoose.model('Banner', BannerSchemas, 'Banner');