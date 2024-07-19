const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    image_link: {
        type: String,
    },
    company_id: {
        type: String
    },
    link: {
        type: String
    }
});

module.exports = mongoose.model('tb_brand', BrandSchema);