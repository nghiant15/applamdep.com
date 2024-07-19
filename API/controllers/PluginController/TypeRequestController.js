const ObjectId = require('mongodb').ObjectId
const TypeRequest = require('../../models/PluginCollection/TypeRequestModel')
const Response = require('../../helpers/Response');

module.exports = {
    getListTypeRequest: async (req, res) => {
        try {
            var result = await TypeRequest.find({ isDelete: false });
            
            if(result){
                res.send(Response(200, "Lấy danh sách thành công", result, true));
            } else {
                res.send(Response(202, "Lấy danh sách thất bại", result, true));
            }

        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    addTypeRequest: async (req, res) => {
        try {
            let body = req.body;
            const result = await TypeRequest.create({
                "Value": body.Value,
                "Description": body.Description
            });
            if (result) {
                res.send(Response(200, "Success", [], true));
            } else {
                res.send(Response(202, "Fail", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    updateTypeRequest: async (req, res) => {
        try {
            let body = req.body;
            const objUpdate = {
                "Value": body.Value,
                "Description": body.Description,
                "Status": body.Status
            };

            let result = await TypeRequest.updateOne({ _id: ObjectId(body.id) }, objUpdate);

            if (result) {
                res.send(Response(200, "Success", [], true));
            } else {
                res.send(Response(202, "Fail", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    deleteTypeRequest: async (req, res) => {
        try {
            let body = req.body;
            const objDelete = {
                "isDelete": true
            };
            let result = await TypeRequest.updateOne({ _id: ObjectId(body.id) }, objDelete);

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