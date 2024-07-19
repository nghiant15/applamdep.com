const ObjectId = require('mongodb').ObjectId
const ModelDB = require('../models/ConfigModel')
const Response = require('../helpers/Response');
const ModelQuery = require('../models/ConfigColorModel');
const Gamebeauty = require('../models/PluginCollection/BeautyGame');
const CompanyPlugin = require('../models/PluginCollection/CompanyPluginModel');
module.exports = {

   
    getInfoWeb: async (req, res) => {
        const {  slug} = req.body;
        try {
            
            var result = null;
            var companyInfo = await CompanyPlugin.findOne({
                Slug: slug
            });

            if(companyInfo)
            {

            }
            else 
            {
              return  res.send(Response(202, "", result, false));
            }

            let company_id = companyInfo._id;
         
            var  filterSearch = {Company_id: company_id,
                 isDelete: false,
                 Key: "webinfo"
                };
            var columnDisplay =  'Key Value DataType Type';
            
            result = await ModelDB.findOne(
                filterSearch,
                columnDisplay );
            
            //color
             var resultColor = await ModelQuery.findOne({ company_id: company_id });
             var infobeauty = await Gamebeauty.findOne({ companyId: company_id });

             if(infobeauty) {

             } else {
                const modelInsert = new Gamebeauty({
                      
                       companyId: company_id,
                        scoreMax: 0,
                        score: 0,
                        status: "0",
 
                });
 
 
                const colorConfig =  await modelInsert.save();
                infobeauty = colorConfig;
            }

             if(result) {

             } else {
                const modelInsert = new ModelQuery({
                        mainColor: "#008060",
                        sub_mainColor: "#008060",
                        sub2_mainColor: "#008060",
                        button_color: "#008060",
                        text_mainColor: "#002E25",
                        sucess_color: "#3bb54a",
                        error_color: "#3d0d13",
                        background_color: "#FFFFFF",
                        company_id: company_id
                });
                const colorConfig =  await modelInsert.save();
                resultColor = colorConfig;
            }
            if (result) {
                res.send(Response(200, "Lấy danh sách liên hệ thành công", {
                    dataColor: resultColor,
                    infobeauty: infobeauty,
                    data:JSON.parse(result.Value)
                }, true));
            } else {
                res.send(Response(202, "Lấy danh sách liên hệ thất bại", result, true));
            }

        } catch (err) {
            console.log(err);
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },

    getBySlug: async (req, res) => {
        const { slug} = req.body;

        var resCompany = await CompanyPlugin.findOne({ Slug: slug });

        try {
            var result = null;
            var filterSearch = {Company_id: resCompany._id, isDelete: false};
            var columnDisplay =  'Key Value DataType Type';
            console.log(filterSearch);

             result = await ModelDB.findOne(
                filterSearch,
                columnDisplay );

            if (result) {
                res.send(Response(200, "Lấy danh sách liên hệ thành công", result, true));
            } else {
                res.send(Response(202, "Lấy danh sách liên hệ thất bại", result, true));
            }

        } catch (err) {
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },
    getALl: async (req, res) => {
        const { dataType, type, key, company_id} = req.query;

        console.log(req.query);
      
        try {
            var result = null;
            var filterSearch = {Company_id: company_id, isDelete: false};
            var columnDisplay =  'Key Value DataType Type';
              if( key != null || key != "" )
            {
            filterSearch["Key"] = key;

            }
             result = await ModelDB.find(
                filterSearch,
                columnDisplay );

            if (result) {
                res.send(Response(200, "Lấy danh sách liên hệ thành công", result, true));
            } else {
                res.send(Response(202, "Lấy danh sách liên hệ thất bại", result, true));
            }

        } catch (err) {
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },
    add: async (req, res) => {
        try {
            const { company_id,key,value,dataType,type } = req.body;

            
             var result = await ModelDB.create({
                Key: key,
                Value: value,
                DataType: dataType,
                Type : type,
                Company_id: company_id
            });
             if (result) {
                res.send(Response(200, "Thêm dữ liệu thành công", [], true));
            } else {
                res.send(Response(202, "Thêm dữ liệu thất bại", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err), err, false));
        }
    },

    update: async (req, res) => {
        try {
            // const { name,des,image_link,hrefLink, company_id } = req.body;
 
            // const { id, title,content,level,priorites ,type,icon,status } = req.body;
            const {id, key,value,dataType,type } = req.body;
            console.log(req.body);

            console.log(req.body);
            console.log(req.body);
            var objUpdate = {
                Value: value,
                DataType: dataType,
                Type : type,
            };
        

            let result = await ModelDB.updateOne({ _id: ObjectId(id) }, objUpdate);

            if (result) {
                res.send(Response(200, "Cập nhật dữ liệu thành công", [], true));
            } else {
                res.send(Response(202, "Cập nhật dữ liệu thất bại", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    delete: async (req, res) => {
        try {
            let body = req.body;
            const objDelete = {
                "isDelete": true
            };
            let result = await  ModelDB.updateOne({ _id: ObjectId(body.id) }, objDelete);

            if (result) {
                res.send(Response(200, "Xoá dữ liệu thành công", [], true));
            } else {
                res.send(Response(202, "Xoá dữ liệu thất bại", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    }

    //
}