const ObjectId = require('mongodb').ObjectId
const TypeProduct = require('../../models/MakeUpCollection/type_product')
const Response = require('../../helpers/Response');

module.exports = {
    getListTypeProduct: async (req, res) => {
        try {
            var result = await TypeProduct.find({ isDelete: false });
            
            if(result){
                res.send(Response(200, "Lấy danh sách thành công", result, true));
            } else {
                res.send(Response(202, "Lấy danh sách thất bại", result, true));
            }

        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    addTypeProduct: async (req, res) => {
        try {
            let body = req.body;
            const result = await TypeProduct.create({
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

    updateTypeProduct: async (req, res) => {
        try {
            let body = req.body;
            const objUpdate = {
                "Name": body.Name
            };

            let result = await TypeProduct.updateOne({ _id: ObjectId(body.id) }, objUpdate);

            if (result) {
                res.send(Response(200, "Success", [], true));
            } else {
                res.send(Response(202, "Fail", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    deleteTypeProduct: async (req, res) => {
        try {
            let body = req.body;
            const objDelete = {
                "isDelete": true
            };
            let result = await TypeProduct.updateOne({ _id: ObjectId(body.id) }, objDelete);

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