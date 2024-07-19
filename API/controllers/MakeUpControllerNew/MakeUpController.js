const ObjectId = require('mongodb').ObjectId
const Product = require('../../models/MakeUpCollection/product')
const SubType = require('../../models/MakeUpCollection/subType')
const Brand = require('../../models/MakeUpCollection/brand')
const Color = require('../../models/MakeUpCollection/color')
const Sku = require('../../models/MakeUpCollection/product')
const lodash = require('lodash')
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 60 * 60 });
const Response = require('../../helpers/Response');

module.exports = {
    getColor: async (req, res) => {
        try {

            const { type_id, company_id } = req.body;
            //Danh sách sản phẩm
            const arrProducts = await Product.find({ type_id: ObjectId(type_id) }).select('_id');

            let arrID = []
            for (let i = 0; i < arrProducts.length; i++) {
                arrID.push(arrProducts[i]._id)
            }

            var arrColors = await Color.find({
                'product_id': { $in: arrID },
                'company_id': company_id
            })

            res.send(Response(200, `Get color success`, arrColors, true));
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    getColorNew: async (req, res) => {
        try {

            const { type_id, company_id } = req.body;
            //Danh sách sản phẩm
            const arrProducts = await SubType.aggregate([{
                $match: { type_id: ObjectId(type_id), company_id: company_id }
            }])

            const arrTemp = [];
            for (let i = 0; i < arrProducts[0].color_id.length; i++) {
                arrTemp.push(arrProducts[0].color_id[i]._id)
            }

            var arrColor = await Color.find({
                '_id': { $in: arrTemp },
            })

            res.send(Response(200, `Get color success`, arrColor, true));
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    getDataMakeUp: async (req, res) => {
        try {
            const { hex, company_id } = req.body;
            let arrBrand = [];
            //Danh sách sản phẩm
            const resultProduct = await Color.find({ hex: hex, company_id: company_id }).populate("product_id")
            for (let i = 0; i < resultProduct.length; i++) {
                const resultBrand = await Brand.find({ _id: resultProduct[i].product_id.brand_id });

                if (resultBrand) {
                    arrBrand.push(resultBrand)
                }
            }

            if (resultProduct) {
                res.send(Response(200, `Lấy danh sách thành công !!!`, { list_product: resultProduct, list_brand: arrBrand }, true));
            } else {
                res.send(Response(200, `Lấy danh sách thất bại !!!`, [], false));
            }

        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    getDataMakeUpNew: async (req, res) => {
        try {
            const { hex, company_id } = req.body;
            let arrBrand = [];
            //Danh sách sản phẩm
            var color_id = await Color.findOne({ hex: hex })

            if (color_id) {
                var skus = await Sku.find({ company_id: company_id, color_id: color_id._id })

                if (skus) {
                    for (let i = 0; i < skus.length; i++) {
                        const resultBrand = await Brand.find({ _id: skus[i].brand_id });

                        if (resultBrand) {
                            arrBrand.push(resultBrand)
                        }
                    }

                    res.send(Response(200, `Lấy danh sách thành công !!!`, { list_product: skus, list_brand: arrBrand }, true));

                } else {
                    res.send(Response(200, `Không lấy được sản phẩm !!!`, [], false));
                }
            } else {
                res.send(Response(200, `Màu không tồn tại trong cơ sở dữ liệu !!!`, [], false));
            }


        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },
}