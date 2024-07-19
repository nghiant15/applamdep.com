var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator').default;

const ConfigColorSchemas = new Schema({

    mainColor: {
        type: String,
        default:""
    },
    sub_mainColor: {
        type: String,
        default:""
    },
    sub2_mainColor: {
        type: String,
        default:""
    },
    button_color: {
        type: String,
        default:""
    },
    sucess_color : {
        type: String,
        default:""
    },
    error_color: {
        type: String,
        default:""
    },
    text_mainColor: {
        type: String,
        default:""
    },
    company_id: {
        type: String,
    }
});

module.exports = mongoose.model('ConfigColor', ConfigColorSchemas, 'ConfigColor');