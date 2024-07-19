const ObjectId = require('mongodb').ObjectId
const TypeSDK = require('../../models/MakeUpCollection/type_sdk')
const Response = require('../../helpers/Response');

module.exports = {
    getListTypeSDK: async (req, res) => {
        try {
            var result = await TypeSDK.find({ isDelete: false });
            
            if(result){
                res.send(Response(200, "Lấy danh sách thành công", result, true));
            } else {
                res.send(Response(202, "Lấy danh sách thất bại", result, true));
            }

        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    addTypeSDK: async (req, res) => {
        try {
            let body = req.body;
            const result = await TypeSDK.create({
                "Name": body.Name
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

    updateTypeSDK: async (req, res) => {
        try {
            let body = req.body;
            const objUpdate = {
                // "Name": body.Name,
                "Level": body.Level
            };

            let result = await TypeSDK.updateOne({ _id: ObjectId(body.id) }, objUpdate);

            if (result) {
                res.send(Response(200, "Success", [], true));
            } else {
                res.send(Response(202, "Fail", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    deleteTypeSDK: async (req, res) => {
        try {
            let body = req.body;
            const objDelete = {
                "isDelete": true
            };
            let result = await TypeSDK.updateOne({ _id: ObjectId(body.id) }, objDelete);

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