const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema({
    hex: {
        type: String,
        trim: true
    },
    makeup_id: {
        type: String,
        trim: true
    },
    product_id: {
        type: mongoose.Types.ObjectId,
        trim: true,
        ref: "tb_product_makeup"
    },
    alpha: {
        type: Number,
        trim: true
    },
    company_id: {
        type: String
    }
});

module.exports = mongoose.model('tb_color', ColorSchema);