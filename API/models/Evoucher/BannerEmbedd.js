const mongoose = require('mongoose');



const BannerEmbeddSchema = new mongoose.Schema({
    name: {
        type: String
    },
    title: {
        type: String, 
        default: null
    },
    link: {
        type: String,
        default: null
    },
    type: {
        type: String, 
        default: null

    },
    create_at: 
    {
        type : Date, 
        default: Date.now
    },
    lastUpdated:{
        type : Date, 
        default: null
    }
    ,
    create_by: {
        type: String
    },
    description: {
        type: String,
        default : ""
    },
    status: {
        type: String,
        default: "D"
    },
    relCode: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    embedded: {
        type: String,
        default: ""
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    company_id: {
        type: String
    }
});

module.exports = mongoose.model('BannerEmbedd', BannerEmbeddSchema, 'BannerEmbedd');