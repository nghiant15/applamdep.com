const ObjectId = require('mongodb').ObjectId
const Dictionary = require('../models/DictionaryModel')
const Response = require('../helpers/Response');

module.exports = {
    //User Table

    getDictionary: async (req, res) => {
        try {
            var dataDictionary = await Dictionary.find({ isDelete: false });
            if (dataDictionary) {
                res.send(Response(200, "Get Data Success !!!", dataDictionary, true));
            } else {
                res.send(Response(202, "Get Data Fail !!!", dataDictionary, true));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    addDictionary: async (req, res) => {
        try {
            let body = req.body;
            const result = await Dictionary.create({
                "key": body.key,
                "type": body.type,
                "id_type": body.id_type
            });
            if (result) {
                res.send(Response(200, "Tạo thành công !!!", result, true));
            } else {
                res.send(Response(202, "Tạo thất bại !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    updateDictionary: async (req, res) => {
        try {
            let body = req.body;
            
            const objUpdate = {
                "key": body.key,
                "type": body.type,
                "id_type": body.id_type
            };

            let result = await Dictionary.updateOne({ _id: ObjectId(body.id) }, objUpdate);

            if (result) {
                res.send(Response(200, "Cập nhật thành công !!!", [], true));
            } else {
                res.send(Response(202, "Cập nhật thất bại !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },

    deleteDictionary: async (req, res) => {

        let body = req.body;
        const objDelete = {
            "isDelete": true
        };
        let result = await Dictionary.updateOne({ _id: ObjectId(body.id) }, objDelete);

        if (result) {
            res.send(Response(200, "Success", [], true));
        } else {
            res.send(Response(202, "Fail", [], false));
        }

    }
}