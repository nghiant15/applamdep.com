const ObjectId = require('mongodb').ObjectId
const CustomerRequest = require('../../models/PluginCollection/CustomerRequestModel')
const Customer = require('../../models/PluginCollection/CustomerModel')
const Company = require('../../models/PluginCollection/CompanyPluginModel')
const Response = require('../../helpers/Response');

module.exports = {
    getListRequest: async (req, res) => {
        try {
            var result = await CustomerRequest.find({ isDelete: false }).populate("Company_Id", "Name");

            if (result) {
                res.send(Response(200, "Lấy danh sách thành công", result, true));
            } else {
                res.send(Response(202, "Lấy danh sách thất bại", result, true));
            }
        
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    getListRequestForCustomer: async (req, res) => {
        try {
            let body = req.body;
            var result = await CustomerRequest.find({ isDelete: false, Company_Id: body.Company_Id }).populate("Company_Id", "Name");

            if (result) {
                res.send(Response(200, "Lấy danh sách thành công", result, true));
            } else {
                res.send(Response(202, "Lấy danh sách thất bại", result, true));
            }

        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    addRequest: async (req, res) => {
        try {
            let body = req.body;
            const result = await CustomerRequest.create({
                "UserName": body.UserName,
                "Phone": body.Phone,
                "Email": body.Phone,
                "Address": body.Phone,
                "FullName": body.FullName,
                "Company_Id": body.Company_Id,
                "Type": body.Type
            });
            if (result) {
                await Customer.create({
                    FullName: body.FullName,
                    UserName: body.UserName,
                    Email: body.Email,
                    Phone: body.Phone,
                    Address: body.Address,
                    Company_Id: body.Company_Id,
                });
                res.send(Response(200, "Success", [], true));
            } else {
                res.send(Response(202, "Fail", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    updateRequest: async (req, res) => {
        try {
            let body = req.body;
            const objUpdate = {
                "UserName": body.UserName,
                "Phone": body.Phone,
                "Type": body.Type,
                "FullName": body.FullName,
                "Status": body.Status
            };

            let result = await CustomerRequest.updateOne({ _id: ObjectId(body.id) }, objUpdate);

            if (result) {
                res.send(Response(200, "Success", [], true));
            } else {
                res.send(Response(202, "Fail", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    deleteRequest: async (req, res) => {
        try {
            let body = req.body;
            const objDelete = {
                "isDelete": true
            };
            let result = await CustomerRequest.updateOne({ _id: ObjectId(body.id) }, objDelete);

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