const ObjectId = require('mongodb').ObjectId
const lodash = require('lodash')
const ProductColor = require('../../models/MakeUpCollection/ProductColor')
const Response = require('../../helpers/Response');

module.exports = {
    getListProductColor: async (req, res) => {
        try {
            const { product_id } = req.body;
            var result = await ProductColor.find({ isDelete: false, product_id: product_id });

            if (result) {
                res.send(Response(200, "Lấy gói dữ liệu thành công", result, true));
            } else {
                res.send(Response(202, "Lấy gói dữ liệu thất bại", [], true));
            }

        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    addProductColor: async (req, res) => {
        try {
            const { product_id, color_id, image } = req.body;
            const result = await ProductColor.create({
               color_id: color_id,
               product_id: product_id,
               image: image
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

    updateProductColor: async (req, res) => {
        try {
            const { id, color_id, product_id, image } = req.body;
    
            let result = await ProductColor.updateOne({ _id: ObjectId(id) }, {
                color_id: color_id,
                product_id: product_id,
                image: image
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

    deleteProductColor: async (req, res) => {
        try {
            let body = req.body;
            const objDelete = {
                "isDelete": true
            };
            let result = await ProductColor.updateOne({ _id: ObjectId(body.id) }, objDelete);

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