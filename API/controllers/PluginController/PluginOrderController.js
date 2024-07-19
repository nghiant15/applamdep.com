const ObjectId = require('mongodb').ObjectId
const PluginOrder = require('../../models/PluginCollection/PluginSaveOrderModel')
const PluginCompany = require('../../models/PluginCollection/CompanyPluginModel')
const PluginPackage = require('../../models/PluginCollection/PackageProductModel')
const Package = require('../../models/PluginCollection/PackageProductModel')
const Response = require('../../helpers/Response');
const calTime = require('../../helpers/calTime');
const lodash = require('lodash')

module.exports = {

    countOrder: async (req, res) => {
        try {

            let totalDoc = await PluginOrder.countDocuments({ isDelete: false }).lean()
            let arrTotal = []
            for (let i = 0; i < Number(totalDoc); i++) {
                arrTotal.push(i);
            }

            if (totalDoc) {
                res.send(Response(200, "Lấy gói dữ liệu giao dịch thành công", arrTotal, true));
            } else {
                res.send(Response(202, "Lấy gói dữ liệu giao dịch thất bại", [], true));
            }

        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err), err, false));
        }
    },
    updatePackage: async (req, res) => {
        try {
            const { _id, packageId } = req.body;
            let resPackage = await Package.findOne(
                { "_id": ObjectId(packageId) }
            );
            let findOrder = await PluginOrder.findOne(
                { "_id": ObjectId(_id) });

            let activeDate = findOrder.Active_Date;
            let monthNumber = resPackage.Value;
            let endDateNew = new Date(activeDate);

            let endDateNew1 = endDateNew.setMonth(endDateNew.getMonth() + Number(monthNumber));
            findOrder.End_Date = new Date(endDateNew1);
            findOrder.Package_Id = resPackage._id;
            await findOrder.save();

            res.send(Response(200, "Lưu thành công ", true));
        } catch (err) {

            res.send(Response(202, "Dữ liệu đã tồn tại trong cơ sở dữ liệu !!! Cụ thể " + JSON.stringify(err.keyValue) + " ", err, false));
        }

    },
    getInfoOrderByCompany: async (req, res) => {
        try {
            var result = await PluginOrder.find({ Company_Id: "639d91a71d9bce4f09a9d790" });
            if (result) {
                res.send(Response(200, "Lấy gói dữ liệu giao dịch thành công", result, true));
            } else {
                res.send(Response(202, "Lấy gói dữ liệu giao dịch thất bại", [], true));
            }
        } catch (err) {
            cosole.log(err);
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err), err, false));
        }
    },

    getListOrder: async (req, res) => {
        try {

            var result = await PluginOrder.find({ isDelete: false })
                .populate("Sale_Id", "Name")
                .populate("Company_Id", "Name")
                .populate("Package_Id", "Name")
                .sort({ _id: -1 })
                .skip(Number(req.body.skip)).limit(5).lean();

            let arrResult = lodash.reverse(result);

            if (arrResult) {
                res.send(Response(200, "Lấy gói dữ liệu giao dịch thành công", arrResult, true));
            } else {
                res.send(Response(202, "Lấy gói dữ liệu giao dịch thất bại", [], true));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err), err, false));
        }

    },

    getListOrderBySaleID: async (req, res) => {
        try {
            var result = await PluginOrder.find({ isDelete: false, Sale_Id: req.user._id })
                .populate("Sale_Id", "Name")
                .populate("Company_Id", "Name")
                .populate("Package_Id", "Name")
                .sort({ Create_Date: 1 })
                .skip(Number(req.body.skip)).limit(5).lean();
            let arrResult = lodash.reverse(result);
            if (arrResult) {
                res.send(Response(200, "Lấy gói dữ liệu giao dịch thành công", arrResult, true));
            } else {
                res.send(Response(202, "Lấy gói dữ liệu giao dịch thất bại", [], true));
            }

        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    getListOrderByID: async (req, res) => {
        try {
            var result = await PluginOrder.find({ isDelete: false, Company_Id: req.company_id })
                .populate("Company_Id").populate("Package_Id").lean();
            if (result) {
                res.send(Response(200, "Lấy gói dữ liệu giao dịch thành công", result, true));
            } else {
                res.send(Response(202, "Lấy gói dữ liệu giao dịch thất bại", [], true));
            }

        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    getListOrderForAdmin: async (req, res) => {
        try {
            var result = await PluginOrder.find({ isDelete: false, Company_Id: req.body.company_id }).lean();
            let arrCompany = [];
            let arrPackage = [];

            if (result) {
                for (let i = 0; i < result.length; i++) {
                    var dataPackage = await PluginPackage.findOne({ isDelete: false, _id: result[i].Package_Id });
                    var dataCompany = await PluginCompany.findOne({ isDelete: false, _id: result[i].Company_Id });
                    arrCompany.push({ _id: result[i].Company_Id, name: dataCompany.Name })
                    arrPackage.push({ _id: result[i].Package_Id, name: dataPackage.Name })
                }

                res.send(Response(200, "Lấy gói dữ liệu giao dịch thành công", { result: result, company: arrCompany, package: arrPackage }, true));
            } else {
                res.send(Response(202, "Lấy gói dữ liệu giao dịch thất bại", [], true));
            }

        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    addOrder: async (req, res) => {
        try {
            let body = req.body;
            const result = await PluginOrder.create({
                "Company_Id": body.Company_Id,
                "Package_Id": body.Package_Id,
                "Sale_Id": req.user._id,
                "Array_Feature": body.Array_Feature,
                "Active_Date": body.Active_Date,
                "End_Date": body.End_Date
            });
            if (result) {
                res.send(Response(200, "Đã thêm giao dich thành công !!!", [], true));
            } else {
                res.send(Response(202, "Thêm gói giao dịch thất bại !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    updateOrder: async (req, res) => {
        try {
            let body = req.body;
            const objUpdate = {
                "Company_Id": body.Company_Id,
                "Package_Id": body.Package_Id,
                "Array_Feature": body.Array_Feature,
                "Active_Date": body.Active_Date,
                "End_Date": body.End_Date
            };

            let result = await PluginOrder.updateOne({ _id: ObjectId(body.id) }, objUpdate);

            if (result) {
                res.send(Response(200, "Cập nhật gói thành công !!!", [], true));
            } else {
                res.send(Response(202, "Cập nhật gói thất bại !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    checkoutOrder: async (req, res) => {
        try {
            let body = req.body;
            const objUpdate = {
                Status: "1",
                Active_Date: body.Active_Date,
                End_Date: body.End_Date,
                Array_Feature: body.Array_Feature
            };

            let result = await PluginOrder.updateOne({ _id: ObjectId(body.id) }, objUpdate);

            if (result) {
                res.send(Response(200, "Duyệt đơn hàng thành công !!!", [], true));
            } else {
                res.send(Response(202, "Duyệt đơn hàng thất bại !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },


    deleteOrder: async (req, res) => {
        try {
            let body = req.body;
            const objDelete = {
                "isDelete": true
            };
            let result = await PluginOrder.updateOne({ _id: ObjectId(body.id) }, objDelete);

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