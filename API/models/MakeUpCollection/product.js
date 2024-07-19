const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    type_id: {
        type: mongoose.Types.ObjectId,
        trim: true,
        ref: 'tb_sub_type_makeup'
    },
    brand_id: {
        type: mongoose.Types.ObjectId,
        trim: true,
        ref: 'tb_brand'
    },
    color_id: {
        type: String,
        ref: "tb_color"
    },
    name: {
        type: String,
        trim: true
    },
    href: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    image_link: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        default: 0
    },
    company_id: {
        type: String,
        ref: "CompanyPlugin"
    },
    type_product: {
        type: String
    }
});

module.exports = mongoose.model('tb_product_makeup', ProductSchema);