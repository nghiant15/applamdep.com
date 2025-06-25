const ObjectId = require('mongodb').ObjectId
const ModelDB = require('../models/ConfigModel')
const Response = require('../helpers/Response');
const ModelQuery = require('../models/ConfigColorModel');
const Gamebeauty = require('../models/PluginCollection/BeautyGame');
const CompanyPlugin = require('../models/PluginCollection/CompanyPluginModel');
const Model = require('../models/tranganh/PopupRequest');
module.exports = {
   
  
    getAll: async (req, res) => {
        const {  slug} = req.query;
        try {
            var result = null;
            var columnDisplay =  'fullName, contentAddvice,address, slug, phone, create_date';
            var filterSearch=  {};
     
            result = await Model.find(filterSearch)
            .sort({ create_date: -1 });;
            if(result)
            {
                return  res.send(Response(200, "Thông tin thành công", result,true));
            }
            return  res.send(Response(200, "lấy thất bại", result,true));
        } catch (err) {

            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },
    add: async (req, res) => {
        try {
            const { address, fullName, contentAddvice,slug, phone } = req.body;
            var itemInsert = await Model.create({
                address: address,
                contentAddvice: contentAddvice,
                slug: slug,
                fullName : fullName,
                phone : phone

            });
            res.send(Response(200, "Thao tác thành công", [], true));
        } 
        catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err), err, false));
        }
    }
}