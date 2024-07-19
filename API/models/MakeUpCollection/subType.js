const mongoose = require('mongoose');

const SubTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    type_id:{
        type: mongoose.Types.ObjectId,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    hover: {
        type: String
    },
    vi: {
        type: String,
        trim: true
    },
    company_id: {
        type: String
    },
    color_id: {
        type: Array,
        default: []
    },
    sub_type: {
        type: String
    },
    isNull: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('tb_sub_type_makeup', SubTypeSchema);