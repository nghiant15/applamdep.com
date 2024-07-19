const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  image_link: {
    type: String,
  },
  brand_id: {
    type: String,
    ref: "tb_brand", ref: "BrandPlugin"
  },
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  linkdetail: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  sdktype: {
    type: String,
    required: true,
  },
  name_level: {
    type: String
  },
  price: {
    type: Number,
    default: 0
  },
  type_sdk_id: {
    type: String,
    ref: "TypeSDK"
  },
  type_product_id: {
    type: String,
    ref: "TypeProduct"
  },
  companyid: {
    type: String,
    required: false,
    ref: "CompanyPlugin"
  },
});

module.exports = mongoose.model("Item", itemSchema);
