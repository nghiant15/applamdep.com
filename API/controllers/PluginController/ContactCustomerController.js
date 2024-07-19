const ObjectId = require('mongodb').ObjectId
const ContactCustomer = require('../../models/PluginCollection/ContactCustomerModel')
const TypeRequest = require('../../models/PluginCollection/TypeRequestModel')
const Response = require('../../helpers/Response');

module.exports = {
    getListContact: async (req, res) => {
        try {
            var result = await ContactCustomer.find({ isDelete: false })
            //.populate("Type_Request", "Value Description");

            if (result) {
                res.send(Response(200, "Lấy danh sách liên hệ thành công", result, true));
            } else {
                res.send(Response(202, "Lấy danh sách liên hệ thất bại", result, true));
            }

        } catch (err) {
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },

    addContact: async (req, res) => {
        try {
            const { Name, Phone, Type_Request, Status, Content } = req.body;
            // var type_req = await TypeRequest.findOne({ Value: Type_Request });
            // var type_req_0 = await TypeRequest.findOne({ Value: "0" });
            // if(type_req){
            //     var result = await ContactCustomer.create({
            //         Name: Name,
            //         Phone: Phone,
            //         Type_Request: type_req._id,
            //         Status: Status,
            //         Content: Content
            //     });
            // } else {
            var result = await ContactCustomer.create({
                Name: Name,
                Phone: Phone,
                Type_Request: Type_Request,
                Status: Status,
                Content: Content
            });
            //}

            if (result) {
                res.send(Response(200, "Thêm dữ liệu thành công", [], true));
            } else {
                res.send(Response(202, "Thêm dữ liệu thất bại", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    updateContact: async (req, res) => {
        try {
            const { Name, Phone, Type_Request, Status, Content, id } = req.body;
            // var type_req = await TypeRequest.findOne({ Value: Type_Request });
            // var type_req_0 = await TypeRequest.findOne({ Value: "0" });

            // if (type_req) {
            //     var objUpdate = {
            //         Name: Name,
            //         Phone: Phone,
            //         Type_Request: type_req._id,
            //         Status: Status,
            //         Content: Content
            //     };
            //} else {
            var objUpdate = {
                Name: Name,
                Phone: Phone,
                Type_Request: Type_Request,
                Status: Status,
                Content: Content
            };
            //}

            let result = await ContactCustomer.updateOne({ _id: ObjectId(id) }, objUpdate);

            if (result) {
                res.send(Response(200, "Cập nhật dữ liệu thành công", [], true));
            } else {
                res.send(Response(202, "Cập nhật dữ liệu thất bại", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    updateStatus: async (req, res) => {
        try {
            const { Status, id } = req.body;


            var objUpdate = {
                Status: Status,
            };


            let result = await ContactCustomer.updateOne({ _id: ObjectId(id) }, objUpdate);

            if (result) {
                res.send(Response(200, "Cập nhật dữ liệu thành công", [], true));
            } else {
                res.send(Response(202, "Cập nhật dữ liệu thất bại", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    deleteContact: async (req, res) => {
        try {
            let body = req.body;
            const objDelete = {
                "isDelete": true
            };
            let result = await ContactCustomer.updateOne({ _id: ObjectId(body.id) }, objDelete);

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