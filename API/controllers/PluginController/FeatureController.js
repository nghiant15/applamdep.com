const ObjectId = require('mongodb').ObjectId
const lodash = require('lodash')
const Feature = require('../../models/PluginCollection/FeatureModel')
const PluginOrder = require('../../models/PluginCollection/PluginSaveOrderModel')
const PackageProduct = require('../../models/PluginCollection/PackageProductModel')
const Response = require('../../helpers/Response');

module.exports = {
    getListFeature: async (req, res) => {
        try {
            var result = await Feature.find({ isDelete: false });

            if (result) {
                res.send(Response(200, "Lấy gói dữ liệu thành công", result, true));
            } else {
                res.send(Response(202, "Lấy gói dữ liệu thất bại", [], true));
            }

        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    addFeature: async (req, res) => {
        try {
            let body = req.body;
            const result = await Feature.create({
                "Key": body.Key,
                "Value": body.Value,
                "Type": body.Type,
                "Image": body.Image,
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

    getDataFeature: async (req, res) => {
        try {
            const { feature } = req.body;
            var arrTemp = [];

            for (let i = 0; i < feature.length; i++) {
                var result = await Feature.findOne({ _id: feature[i], isDelete: false });
                arrTemp.push(result);
            }
            // var result = await Package.findOne({ _id: package_id, isDelete: false });

            res.send(Response(200, "Lấy danh sách feature thành công !!!", arrTemp, true));
            // } else {
            //     res.send(Response(200, "Lấy danh sách gói thất bại !!!", result, false));
            // }
        } catch (err) {
            res.send(Response(202, "Đã xảy ra lỗi ở: " + JSON.stringify(err.keyValue), err, false));
        }


    },

    updateFeature: async (req, res) => {
        try {
            let body = req.body;
            const objUpdate = {
                "Key": body.Key,
                "Value": body.Value,
                "Type": body.Type,
                "Image": body.Image,
                "Status": body.Status
            };

            let result = await Feature.findOneAndUpdate({ _id: ObjectId(body.id) }, objUpdate);

            if (result) {
                let resultOrder = await PluginOrder.find({ isDelete: false, 'Array_Feature._id': String(body.id) });

                for (let i = 0; i < resultOrder.length; i++) {
                    let idOrder = resultOrder[i]._id;
                    let arrFeature = resultOrder[i].Array_Feature;
                    let index = lodash.findIndex(arrFeature, { '_id': body.id })
                    arrFeature.splice(index, 1,
                        {
                            Key: body.Key,
                            Value: body.Value,
                            Type: body.Type,
                            Image: body.Image,
                            Status: body.Status,
                            isDelete: result.isDelete,
                            _id: body.id,
                            __v: 0
                        });

                    await PluginOrder.updateOne({ _id: idOrder }, { Array_Feature: arrFeature });                   

                }

                let resultPackage = await PackageProduct.find({ isDelete: false, 'Array_Feature._id': String(body.id) });

                for (let i = 0; i < resultPackage.length; i++) {
                    let idPackage = resultPackage[i]._id;
                    let arrPackage = resultPackage[i].Array_Feature;
                    let index = lodash.findIndex(arrPackage, { '_id': body.id })
                    arrPackage.splice(index, 1,
                        {
                            Key: body.Key,
                            Value: body.Value,
                            Type: body.Type,
                            Image: body.Image,
                            Status: body.Status,
                            isDelete: result.isDelete,
                            _id: body.id,
                            __v: 0
                        });
                    await PackageProduct.updateOne({ _id: idPackage }, { Array_Feature: arrPackage });                   

                }

                res.send(Response(200, "Cập nhật gói thành công !!!", [], true));
            } else {
                res.send(Response(202, "Cập nhật gói thất bại !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    deleteFeature: async (req, res) => {
        try {
            let body = req.body;
            const objDelete = {
                "isDelete": true
            };
            let result = await Feature.updateOne({ _id: ObjectId(body.id) }, objDelete);

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