const ObjectId = require('mongodb').ObjectId
const ProductSpecial = require('../models/ParameterRecomedConfigModel')
const Response = require('../helpers/Response');
const ConfigModel = require("../models/ConfigModel");
var fp = require('lodash/fp');
module.exports = {


    getAllByLevels: async (req, res) => {
        const { level, typeFilter, company_id, levels } = req.body;
       
        console.log(levels);

        // const company_id = "61ce79c4d19f5244aa161b36";

        try {

            var result = null;
            const arrFilter = [];
            var columnDisplay =  'Key Value DataType Type';
            var showhideConfigData = await ConfigModel.findOne(
            {
            Company_id: "61ce79c4d19f5244aa161b36",
            isDelete: false,
            Key: "showHideRecomendGroup"
            },
            columnDisplay );

            var arrTemp = ['K5', 'K6', 'K7', 'K8', 'K9' ];

            var filteredArray = arrTemp.filter( function( el ) {
                return arrFilter.indexOf( el ) >= 0;
              } );

              filteredArray =  ['K5', 'K6', 'K7', 'K8', 'K9' ];
              console.log(filteredArray);

              result = await ProductSpecial.find(
                {   isDelete: false, Company_Id: company_id,
                     Level: level,
                     Type: typeFilter,
                     GroupProduct: { $in: filteredArray }
                },
                 'Title _id Type Content Level Priorites GroupProduct Icon' );
             if (result) {
                res.send(Response(200, "Lấy danh sách liên hệ thành công", result, true));
            } else {
                res.send(Response(202, "Lấy danh sách liên hệ thất bại", result, true));
            }

        } catch (err) {

            console.log(err);
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },

    getAllCocludeDetail: async (req, res) => {
        const {  company_id, result } = req.body;
        const arrTemp = [];
        const arrTempLevel = [];
        const arrTypeProduct_ID = [];
        const arrReturn = [];

        for (let i = 0; i < result.length; i++) {
             arrTemp.push(result[i].level)
             arrTempLevel.push(result[i].sdktype)
        }

        var response = await ProductSpecial.find(
            {
                Company_Id: company_id,
                isDelete: false,
                Type : 0,
                Level: { $in: arrTempLevel }
            }
            
            );

            var groupBy = function(xs, key) {
                return xs.reduce(function(rv, x) {
                  (rv[x[key]] = rv[x[key]] || []).push(x);
                  return rv;
                }, {});
              };

         const result1 = groupBy(response,"GroupProduct");

        res.send(Response(200, "Success", result1, true));
       
    },

    getAllCocludeOverView: async (req, res) => {
        const {  company_id, result } = req.body;
        const arrTemp = [];
        const arrTempLevel = [];
        const arrTypeProduct_ID = [];
        const arrReturn = [];

        for (let i = 0; i < result.length; i++) {
             arrTemp.push(result[i].level)
             arrTempLevel.push(result[i].sdktype)
        }

        var response = await ProductSpecial.find(
            {
                Company_Id: company_id,
                isDelete: false,
                Type : 1,
                Level: { $in: arrTempLevel }
            }
            
            );

            var groupBy = function(xs, key) {
                return xs.reduce(function(rv, x) {
                  (rv[x[key]] = rv[x[key]] || []).push(x);
                  return rv;
                }, {});
              };

         const result1 = groupBy(response,"GroupProduct");

        res.send(Response(200, "Success", result1, true));
       
    },
    getAllByLevel: async (req, res) => {
        const { level, typeFilter, company_id } = req.body;
        console.log(req.body);

        // const company_id = "61ce79c4d19f5244aa161b36";

        try {

            var result = null;
            const arrFilter = [];
            var columnDisplay =  'Key Value DataType Type';
            var showhideConfigData = await ConfigModel.findOne(
            {
            Company_id: "61ce79c4d19f5244aa161b36",
            isDelete: false,
            Key: "showHideRecomendGroup"
            },
            columnDisplay );


            // var objectshowHideConfigData = JSON.parse(showhideConfigData.Value);
            //  objectshowHideConfigData.forEach(itemConfigData => {

            //     if( itemConfigData.value )
            //     {
            //       arrFilter.push(itemConfigData.key.toUpperCase());
            //     }

            // });
            var arrTemp = ['K5', 'K6', 'K7', 'K8', 'K9' ];

            var filteredArray = arrTemp.filter( function( el ) {
                return arrFilter.indexOf( el ) >= 0;
              } );

              filteredArray =  ['K5', 'K6', 'K7', 'K8', 'K9' ];
              console.log(filteredArray);

              result = await ProductSpecial.find(
                {   isDelete: false, Company_Id: company_id,
                     Level: level,
                     Type: typeFilter,
                     GroupProduct: { $in: filteredArray }
                },
                 'Title _id Type Content Level Priorites GroupProduct Icon' );
             if (result) {
                res.send(Response(200, "Lấy danh sách liên hệ thành công", result, true));
            } else {
                res.send(Response(202, "Lấy danh sách liên hệ thất bại", result, true));
            }

        } catch (err) {

            console.log(err);
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },
    getOverview:  async (req, res) => {

        const { requriedCheck,typeFilter, level, company_id } = req.body;
        console.log(requriedCheck);
    
         var columnDisplay =  'Key Value DataType Type';
        var showhideConfigData = await ConfigModel.findOne(
          {
            Company_id: "61ce79c4d19f5244aa161b36",
             isDelete: false,
             Key: "showHideRecomendGroup"
          },
          columnDisplay );
         var objectshowHideConfigData = JSON.parse(showhideConfigData.Value);
        //  console.log(objectshowHideConfigData);


        const arrTemp = [];
        const arrFilter = [];
        const arrTempLevel = [];
        const arrTypeProduct_ID = [];
        const arrReturn = [];
        var obj = {};


        for (let i = 0; i < requriedCheck.length; i++) {

          arrTemp.push(requriedCheck[i].level)
          var key = requriedCheck[i].level;

          obj[key]=  requriedCheck[i].sdktype;

        }
         objectshowHideConfigData.forEach(itemConfigData => {

            if( itemConfigData.value )
            {
              arrFilter.push(itemConfigData.key.toUpperCase());
            }

        });
        var filteredArray = arrTemp.filter( function( el ) {
          return arrFilter.indexOf( el ) >= 0;
        } );
      
          const datareturn = await ProductSpecial.find({
             isDelete: false,
             Type:   "0",
             Company_Id: company_id,
              GroupProduct: { $in: filteredArray }

        }, 'Title _id Type Content Level Priorites GroupProduct Icon ' )
        .sort({'GroupProduct': 'asc'});


        let  result = datareturn.reduce(function (r, a) {
            r[a.GroupProduct] = r[a.GroupProduct] || [];
            let  keytemp = a.GroupProduct;
            let levelTemp =(obj[keytemp]);
            r[a.GroupProduct].push(a);
           
            // if( levelTemp == a.Level )
            // {
            //       r[a.GroupProduct].push(a);
            // };
            return r;
        }, Object.create(null));
         res.send(Response(200, "Success", result, true));

    },
    getKLCT:  async (req, res) => {
  
        const { requriedCheck,typeFilter, level,company_id } = req.body;
        console.log(requriedCheck);
        // const company_id = "61ce79c4d19f5244aa161b36";
         var columnDisplay =  'Key Value DataType Type';
        var showhideConfigData = await ConfigModel.findOne(
          {
            Company_id: "61ce79c4d19f5244aa161b36",
             isDelete: false,
             Key: "showHideRecomendGroup"
          },
          columnDisplay );
         var objectshowHideConfigData = JSON.parse(showhideConfigData.Value);
        //  console.log(objectshowHideConfigData);


        const arrTemp = [];
        const arrFilter = [];
        const arrTempLevel = [];
        const arrTypeProduct_ID = [];
        const arrReturn = [];
        var obj = {};


        for (let i = 0; i < requriedCheck.length; i++) {

          arrTemp.push(requriedCheck[i].level)
          var key = requriedCheck[i].level;

          obj[key]=  requriedCheck[i].sdktype;

        }
         objectshowHideConfigData.forEach(itemConfigData => {

            if( itemConfigData.value )
            {
              arrFilter.push(itemConfigData.key.toUpperCase());
            }

        });
        var filteredArray = arrTemp.filter( function( el ) {
          return arrFilter.indexOf( el ) >= 0;
        } );

          const datareturn = await ProductSpecial.find({
             isDelete: false,
             Type:   "1",
             Company_Id: company_id,
              GroupProduct: { $in: filteredArray }

        }, 'Title _id Type Content Level Priorites GroupProduct ' )
        .sort({'GroupProduct': 'asc'});

        // res.send(Response(200, "Success", datareturn, true));
        let  result = datareturn.reduce(function (r, a) {
            r[a.GroupProduct] = r[a.GroupProduct] || [];
            let  keytemp = a.GroupProduct;
            let levelTemp =(obj[keytemp]);
            if( levelTemp == a.Level )
            {
                  r[a.GroupProduct].push(a);
            };
           
            return r;
        }, Object.create(null));
         res.send(Response(200, "Success", result, true));

    },
    getALl: async (req, res) => {
        const { typeFilter, groupProduct, company_id } = req.query;

        console.log(req.query);

        try {

            var result = null;
           if( typeFilter != null || typeFilter != "" )

             {

                result = await ProductSpecial.find(
                    { isDelete: false, Company_Id: company_id, Type: typeFilter  },
                     'Title _id Type Content Level Priorites Icon GroupProduct' );
             }


             if( groupProduct != null || groupProduct != "" )
             {
                result = await ProductSpecial.find(
                    { isDelete: false, Company_Id: company_id, Type: typeFilter,
                        GroupProduct: groupProduct
                    },
                     'Title _id Type Content Level Priorites Icon GroupProduct' );
             }


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
            const { title,groupProduct,content,level,priorites , company_id,companyId,type,icon,status } = req.body;
             console.log(req.body);
            var result = await ProductSpecial.create({
                Title: title,
                Content: content,
                Level: level,
                Priorites : priorites,
                Type: type,
                GroupProduct: groupProduct,
                Icon:icon,
                Status:status,
                Company_Id:companyId
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
            const { id, title,company_id, content,level,priorites ,type,icon,status } = req.body;
            var objUpdate = {
                Title: title,
                Content: content,
                Level: level,
                Priorites : priorites,
                Type: type,
                Icon:icon,
                Status:status
            }
            let result = await ProductSpecial.updateOne({ _id: ObjectId(id) }, objUpdate);
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
            let result = await  ProductSpecial.updateOne({ _id: ObjectId(body.id ) }, objDelete);

            if (result) {
                res.send(Response(200, "Xgit reset --hard HEAD~1oá dữ liệu thành công", [], true));
            } else {
                res.send(Response(202, "Xoá dữ liệu thất bại", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },
     addBanner: async (req, res) => {
        try {
            const { company_id, banner = "https://applamdep.com/banner1.jpg", sub_banner = "https://applamdep.com/banner1.jpg" } = req.body;
            const count = await BannerModel.countDocuments({ company_id: company_id });
            if (count > 0) {
                const res = await BannerModel.updateOne({ company_id: company_id }, { banner: banner, sub_banner: sub_banner });
                if (res) {
                    res.send(Response(202, "Cập nhật dữ liệu thành công !!!", [], true));
                } else {
                    res.send(Response(202, "Cập nhật dữ liệu thất bại !!", [], false));
                }
            } else {
                const res = await BannerModel.create({ company_id: company_id, banner: banner, sub_banner: sub_banner });
                if (res) {
                    res.send(Response(202, "Thêm dữ liệu thành công !!!", res, true));
                } else {
                    res.send(Response(202, "Thêm dữ liệu thất bại !!", [], false));
                }
            }

        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    }

}