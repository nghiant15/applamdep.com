var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator').default;
const SettingPluginModel = new Schema({
    showOrHide: {
        type:  String, 
        default: "0"
    },
    slug: {
        type:  String, 
        default: "" 
    }

});

module.exports = mongoose.model('SettingPlugin', SettingPluginModel, 'SettingPlugin');