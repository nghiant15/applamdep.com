const ObjectId = require('mongodb').ObjectId
const Package = require('../../models/PluginCollection/PackageProductModel')
const Response = require('../../helpers/Response');

module.exports = {
    getListPackage: async (req, res) => {
        try {  
            var result = await Package.find({ isDelete: false }).sort({'Create_Date': -1});

            var listData = [];
            for(var i = 0; i < result.length;i++){
            
                var item =  {

                };
                var dataList = item.listFilter;
                item._id =   result[i]._id;
                item.Name =   result[i].Name;
                item.Value =   result[i].Value;
                item.Unit =   result[i].Unit;
                item.listFilter =   result[i].listFilter;
                item.Array_Feature =   result[i].Array_Feature;
                item.Status =  result[i].Status;
                item.radio1 = false;
                item.radio2 = false;
                item.radio3 = false;
                item.radio4 = false;
                item.radio5 = false;
                item.radio6 = false;
                item.radio7 = false;
                item.radio8 = false;
                item.radio9 = false;
                var dataCheck = result[i].listFilter;
                
                for( var k =0; k < dataCheck.length; k++ )
                    {    
                        
                            var itemcheck =  dataCheck[k];
                            console.log(itemcheck.fiter1);
                            console.log(itemcheck.value);
                            if( itemcheck.fiter1 == "radio9" )
                            {
                                 item.radio9 = itemcheck.value;
                            }

                            if( itemcheck.fiter1 == "radio8" )
                            {
                            item.radio8 = itemcheck.value;
                            }
                            if( itemcheck.fiter1 == "radio7" )
                            {
                            item.radio7 = itemcheck.value;
                            }
                            if( itemcheck.fiter1 == "radio6" )
                            {
                                  item.radio6 = itemcheck.value;
                            }
                            if( itemcheck.fiter1 == "radio5" )
                            {
                                 item.radio5 = itemcheck.value;
                            }
                            if( itemcheck.fiter1 == "radio4" )
                            {
                                 item.radio4 = itemcheck.value;
                            }
                            if( itemcheck.fiter1 == "radio3" )
                            {
                                 item.radio3 = itemcheck.value;
                            }
                            if( itemcheck.fiter1 == "radio2" )
                            {
                            
                              item.radio2 = itemcheck.value;
                            }
                            if( itemcheck.fiter1 == "radio1" )
                            {
                               item.radio1 = itemcheck.value;
                            }

                 }

                listData.push(item);


            }
        

            if(result){
                res.send(Response(200, "Lấy gói dữ liệu thành công", listData, true));
            } else {
                res.send(Response(202, "Lấy gói dữ liệu thất bại", [], true));
            }

        } catch (err) {
            console.log(err);
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    addPackage: async (req, res) => {
        try {
            let body = req.body;
            const result = await Package.create({
                "Name": body.Name,
                "Value": body.Value,
                "Unit": body.Unit,
                "Array_Feature": body.Array_Feature

            });
            if (result) {
                res.send(Response(200, "Đã thêm gói thành công !!!", [], true));
            } else {
                res.send(Response(202, "Thêm gói thất bại !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },
    updatePackage2: async (req, res) => {
        try {
            let body = req.body;
            const objUpdate = {
                "Name": body.Name,
                "Value": body.Value,
                "moneyPrice": body.moneyPrice,
                "listFilter": body.listFilter,
                "Unit": body.Unit,
                "Array_Feature": body.Array_Feature,
                "Status": body.Status
            };

            console.log(objUpdate);

            let result = await Package.updateOne({ _id: ObjectId(body.id) }, objUpdate);

            if (result) {
                res.send(Response(200, "Cập nhật gói thành công !!!", [], true));
            } else {
                res.send(Response(202, "Cập nhật gói thất bại !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    addPackage2: async (req, res) => {
        try {
            let body = req.body;
            var bodyParram = {
                "Name": body.Name,
                "Value": body.Value,
                "Unit": body.Unit,
                "moneyPrice": body.moneyPrice,
                "listFilter": body.listFilter

            };
        
            const result = await Package.create(bodyParram);
            if (result) {
                res.send(Response(200, "Đã thêm gói thành công !!!", [], true));
            } else {
                res.send(Response(202, "Thêm gói thất bại !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    getNamePackage: async (req, res) => {
        try {
            const { package_id } = req.body;
            var result = await Package.findOne({ _id: package_id, isDelete: false });
            if (result) {
                res.send(Response(200, "Lấy danh sách gói thành công !!!", result, true));
            } else {
                res.send(Response(200, "Lấy danh sách gói thất bại !!!", result, false));
            }
        } catch (err) {
            res.send(Response(202, "Đã xảy ra lỗi ở: " + JSON.stringify(err.keyValue), err, false));
        }


    },
    
    
    updatePackage: async (req, res) => {
        try {
            let body = req.body;
            const objUpdate = {
                "Name": body.Name,
                "Value": body.Value,
                "Unit": body.Unit,
                "Array_Feature": body.Array_Feature,
                "Status": body.Status
            };

            let result = await Package.updateOne({ _id: ObjectId(body.id) }, objUpdate);

            if (result) {
                res.send(Response(200, "Cập nhật gói thành công !!!", [], true));
            } else {
                res.send(Response(202, "Cập nhật gói thất bại !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    deletePackage: async (req, res) => {
        try {
            let body = req.body;
            const objDelete = {
                "isDelete": true
            };
            let result = await Package.updateOne({ _id: ObjectId(body.id) }, objDelete);

            if (result) {
                res.send(Response(200, "Success", [], true));
            } else {
                res.send(Response(202, "Fail", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    }

    //
}