const ObjectId = require('mongodb').ObjectId
const Brand = require('../../models/MakeUpCollection/brand')
const BrandPlugin = require('../../models/PluginCollection/BrandPluginModel')
const Type = require('../../models/MakeUpCollection/type')
const Sku = require('../../models/MakeUpCollection/product')
const Color = require('../../models/MakeUpCollection/color')
const SubType = require('../../models/MakeUpCollection/subType')
const Item = require('../../models/MakeUpCollection/item')
const Package = require('../../models/PluginCollection/PackageProductModel')
const PluginOrder = require('../../models/PluginCollection/PluginSaveOrderModel')
const User = require('../../models/PluginCollection/UserPluginModel')
const Response = require('../../helpers/Response');
const calTime = require('../../helpers/calTime');
const lodash = require('lodash');
const fs = require('fs');

module.exports = {
    getListBrand: async (req, res) => {
        try {
            const { limit } = req.query;

            if (limit == null) {

                const cursor = await Brand.find();

                res.json({
                    status: 200,
                    message: "Success",
                    data: cursor
                });
            } else {
                const cursor = await Brand.find().limit(Number(limit));

                res.json({
                    status: 200,
                    message: "Success",
                    data: cursor
                });
            }

        } catch (err) {
            res.json({
                status: 201,
                message: err.message,
                data: null
            });
        }
    },
    getSkuMakeup: async (req, res) => {
        try {
            const { brand_id } = req.query;

            const makeupType = await Type
                .aggregate([
                    {
                        $lookup:
                        {
                            from: 'tb_sub_type_makeups',
                            localField: '_id',
                            foreignField: 'type_id',
                            as: 'sub_type_makeup'
                        }
                    }
                ]);

            const sku = await Sku
                .find({ brand_id: ObjectId(brand_id) });

            const color = await Color.find();

            let pro = [];
            sku.map(val => {
                let hex = color.filter(v => String(v.product_id) == String(val._id) && String(v.makeup_id) != '');
                if (hex.length > 0) {
                    // val.color = hex;
                    pro.push(Object.assign(val.toObject(), { color: hex }));
                }
            })

            let result = [];
            makeupType.map(val => {
                let sub_type = [];
                val.sub_type_makeup.map(sub => {
                    let product = pro.filter(sku => String(sku.type_id) == String(sub._id));
                    if (product.length > 0) {
                        sub.product = product;
                        sub_type.push(sub);
                    }
                })
                if (sub_type.length > 0) {
                    val.sub_type_makeup = sub_type;
                    result.push(val);
                }
            })

            res.json({
                status: result.length > 0 ? 200 : 201,
                message: result.length > 0 ? 'Success' : "There is no sku list",
                data: result.length > 0 ? result : null
            });

        } catch (err) {
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },
    getSku: async (req, res) => {
        try {
            const { brand_id } = req.query;

            const subType = await SubType.find();

            const sku = await Sku
                .find({ brand_id: ObjectId(brand_id) });

            const color = await Color.find();

            let pro = [];
            sku.map(val => {
                let hex = color.filter(v => String(v.product_id) == String(val._id) && String(v.makeup_id) != '');
                if (hex.length > 0) {
                    pro.push(Object.assign(val.toObject(), { color: hex }));
                }
            })

            let result = [];
            subType.map(val => {
                let product = pro.filter(sku => String(sku.type_id) == String(val._id))
                if (product.length > 0) {
                    result.push(Object.assign(val.toObject(), { product: product }));
                }
            })

            res.json({
                status: result.length > 0 ? 200 : 201,
                message: result.length > 0 ? 'Success' : "There is no sku list",
                data: result.length > 0 ? result : null
            });

        } catch (err) {
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },
    getBrand: async (req, res) => {
        const brand = await Brand.find()
            .or([{ company_id: undefined }, { company_id: "1" }, { company_id: null }, { company_id: '' }]);

        res.json({
            status: 200,
            message: "Success",
            data: brand
        });
    },

    getBrand_Company: async (req, res) => {
        const { company } = req.params;
        const brand = await Brand.find({ $or: [{ company_id: company }, { company_id: "1" }] });

        res.json({
            status: 200,
            message: "Success",
            data: brand
        });
    },

    getType: async (req, res) => {
        const { sub_type } = req.params;
        var arrName = []
        if (sub_type == null || sub_type == undefined || sub_type == "" || sub_type == "null") {
            const type = await SubType.find({ company_id: null, isNull: false });

            res.json({
                status: 200,
                message: "Success",
                data: type
            });
        } else {
            const type = await SubType.find({ company_id: null, sub_type: sub_type, isNull: false });
            res.json({
                status: 200,
                message: "Success",
                data: type
            });
        }

    },

    getType_Company: async (req, res) => {
        const { company, sub_type } = req.params;
        const arrTemp = [];

        if (sub_type == null || sub_type == undefined || sub_type == "" || sub_type == "null") {
            const cursor = SubType.find({ company_id: company, isNull: false }).lean().cursor();
            cursor.on('data', function (player) {
                arrTemp.push(player);
            });

            cursor.on('end', async function (e) {
                res.json({
                    status: 200,
                    message: "Success",
                    data: arrTemp
                });
            });
        } else {
            const cursor = SubType.find({ company_id: company, isNull: false, sub_type: sub_type }).lean().cursor();
            cursor.on('data', function (player) {
                arrTemp.push(player);
            });

            cursor.on('end', async function (e) {
                res.json({
                    status: 200,
                    message: "Success",
                    data: arrTemp
                });
            });
        }

    },
    getProductv2: async (req, res) => {
        var show = 1000;

        let totalIiem = await Sku.countDocuments({ company_id: null, type_product: "0" })
        let arrTotal = []
        for (let i = 0; i < Number(totalIiem); i++) {
            arrTotal.push(i);
        }

        var lengthArr = arrTotal.length;
        var skip = req.query.skip || lengthArr - show;

        if (Number(skip) <= 0) {
            var skus = await Sku.find({ company_id: null, type_product: "0" }, `name image_link href image price`)
                .sort({ _id: -1 })
                .skip(lengthArr - (Number(skip) + show))
                .limit(show)
                .populate('type_id', `name color_id type_id`)
                .populate('brand_id', `name`)
                .populate('color_id', `hex makeup_id`)
        } else {
            var skus = await Sku.find({ company_id: null, type_product: "0" }, `name image_link href image price`)
                .sort({ _id: -1 })
                .skip(Number(skip) <= 0 ? 0 : Number(skip))
                .limit(show)
                .populate('type_id', `name color_id type_id`)
                .populate('brand_id', `name`)
                .populate('color_id', `hex`)
        }


        // const skus = await Sku.aggregate([{
        //     $match: { company_id: null }
        // }, {
        //     $lookup: {
        //         from: "tb_sub_type_makeups",
        //         as: "type_id",
        //         localField: "type_id",
        //         foreignField: "_id",

        //     }
        // },

        let arrResult = lodash.reverse(skus);

        res.json({
            status: 200,
            message: "Success",
            data: arrResult,
            arrTotal: arrTotal
        });
    },
    getProduct: async (req, res) => {
        var show = 5;

        let totalIiem = await Sku.countDocuments({ company_id: null, type_product: "0" })
        let arrTotal = []
        for (let i = 0; i < Number(totalIiem); i++) {
            arrTotal.push(i);
        }

        var lengthArr = arrTotal.length;
        var skip = req.query.skip || lengthArr - show;

        if (Number(skip) <= 0) {
            var skus = await Sku.find({ company_id: null, type_product: "0" }, `name image_link href image price`)
                .sort({ _id: -1 })
                .skip(lengthArr - (Number(skip) + show))
                .limit(show)
                .populate('type_id', `name color_id type_id`)
                .populate('brand_id', `name`)
                .populate('color_id', `hex`)
        } else {
            var skus = await Sku.find({ company_id: null, type_product: "0" }, `name image_link href image price`)
                .sort({ _id: -1 })
                .skip(Number(skip) <= 0 ? 0 : Number(skip))
                .limit(show)
                .populate('type_id', `name color_id type_id`)
                .populate('brand_id', `name`)
                .populate('color_id', `hex`)
        }


        // const skus = await Sku.aggregate([{
        //     $match: { company_id: null }
        // }, {
        //     $lookup: {
        //         from: "tb_sub_type_makeups",
        //         as: "type_id",
        //         localField: "type_id",
        //         foreignField: "_id",

        //     }
        // },

        let arrResult = lodash.reverse(skus);

        res.json({
            status: 200,
            message: "Success",
            data: arrResult,
            arrTotal: arrTotal
        });
    },

    getProduct_Company: async (req, res) => {
        const { company } = req.params;
        var show = 5;

        let totalIiem = await Sku.countDocuments({ company_id: company, type_product: "0" })
        let arrTotal = []
        for (let i = 0; i < Number(totalIiem); i++) {
            arrTotal.push(i);
        }

        var lengthArr = arrTotal.length;
        var skip = req.query.skip || lengthArr - show;

        if (Number(skip) <= 0) {
            var skus = await Sku.find({ company_id: company, type_product: "0" }, `name image_link href price`)
                .sort({ _id: -1 })
                .skip(lengthArr - (Number(skip) + show))
                .limit(show)
                .populate('type_id', `name color_id type_id`)
                .populate('brand_id', `name`)
                .populate('color_id', `hex`)
        } else {
            var skus = await Sku.find({ company_id: company, type_product: "0" }, `name image_link href price`)
                .skip(Number(skip) <= 0 ? 0 : Number(skip))
                .limit(show)
                .populate('type_id', `name color_id type_id`)
                .populate('brand_id', `name`)
                .populate('color_id', `hex`)
        }

        res.json({
            status: 200,
            message: "Success",
            data: skus,
            arrTotal: arrTotal
        });

    },

    getProduct_Hair: async (req, res) => {
        var show = 5;

        let totalIiem = await Sku.countDocuments({ company_id: null, type_product: "1" })
        let arrTotal = []
        for (let i = 0; i < Number(totalIiem); i++) {
            arrTotal.push(i);
        }

        var lengthArr = arrTotal.length;
        var skip = req.query.skip || lengthArr - show;

        if (Number(skip) <= 0) {
            var skus = await Sku.find({ company_id: null, type_product: "1" }, `name image_link href image price`)
                .sort({ _id: -1 })
                .skip(lengthArr - (Number(skip) + show))
                .limit(show)
                .populate('type_id', `name color_id type_id`)
                .populate('brand_id', `name`)
                .populate('color_id', `hex`)
        } else {
            var skus = await Sku.find({ company_id: null, type_product: "1" }, `name image_link href image price`)
                .sort({ _id: -1 })
                .skip(Number(skip) <= 0 ? 0 : Number(skip))
                .limit(show)
                .populate('type_id', `name color_id type_id`)
                .populate('brand_id', `name`)
                .populate('color_id', `hex`)
        }


        // const skus = await Sku.aggregate([{
        //     $match: { company_id: null }
        // }, {
        //     $lookup: {
        //         from: "tb_sub_type_makeups",
        //         as: "type_id",
        //         localField: "type_id",
        //         foreignField: "_id",

        //     }
        // },

        let arrResult = lodash.reverse(skus);

        res.json({
            status: 200,
            message: "Success",
            data: arrResult,
            arrTotal: arrTotal
        });
    },

    getProduct_Company_Hair: async (req, res) => {
        const { company } = req.params;
        var show = 5;

        let totalIiem = await Sku.countDocuments({ company_id: company, type_product: "1" })
        let arrTotal = []
        for (let i = 0; i < Number(totalIiem); i++) {
            arrTotal.push(i);
        }

        var lengthArr = arrTotal.length;
        var skip = req.query.skip || lengthArr - show;

        if (Number(skip) <= 0) {
            var skus = await Sku.find({ company_id: company, type_product: "1" }, `name image_link href price`)
                .sort({ _id: -1 })
                .skip(lengthArr - (Number(skip) + show))
                .limit(show)
                .populate('type_id', `name color_id type_id`)
                .populate('brand_id', `name`)
                .populate('color_id', `hex`)
        } else {
            var skus = await Sku.find({ company_id: company, type_product: "1" }, `name image_link href price`)
                .skip(Number(skip) <= 0 ? 0 : Number(skip))
                .limit(show)
                .populate('type_id', `name color_id type_id`)
                .populate('brand_id', `name`)
                .populate('color_id', `hex`)
        }

        res.json({
            status: 200,
            message: "Success",
            data: skus,
            arrTotal: arrTotal
        });

    },

    getColor: async (req, res) => {
        const color = await Color.find({ company_id: null }, `hex makeup_id alpha`)

        res.json({
            status: 200,
            message: "Success",
            data: color,
            sub: []
        });
    },

    getColorSelect: async (req, res) => {

        const { isADMIN, company_id } = req.body;
        if (isADMIN) {
            var color = await Color.find({ company_id: null }, "_id hex")
        } else {
            var color = await Color.find({ company_id: company_id }, "_id hex")
          
        }

        res.json({
            status: 200,
            message: "Success",
            data: color,
            sub: []
        });
    },

    getColor_Company: async (req, res) => {

        var cache = req.app.locals.cache
        var dataColor = cache.get("dataColor");
        var arrSub = cache.get("arrSub");

        if (dataColor == undefined) {
            const { company } = req.params;
            const color = await Color.find({ company_id: company }, `hex makeup_id alpha`)

            cache.set("dataColor", color);
            cache.set("arrSub", arrSub);
            res.json({
                status: 200,
                message: "Success",
                data: color,
                sub: []
            });
        } else {
            res.json({
                status: 200,
                message: "Success",
                data: dataColor,
                sub: []
            });
        }
    },

    addBrand: async (req, res) => {
        const { name, image, company_id, link, image_link } = req.body;
        if (name == null || name.trim() == '' || image == null || image.trim() == '') {
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return
        }

        try {
            const brand = new Brand({
                name: name,
                //image: image,
                image_link: image_link,
                company_id: company_id,
                link: link
            });

            await brand.save();

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        } catch (err) {
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },

    addType: async (req, res) => {
        const { image, vi, company_id, hover, sub_type, color_id } = req.body;

        if (vi == null || vi.trim() == '' || image == null || image.trim() == '') {
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return;
        }

        try {
            const type = new SubType({
                vi: vi,
                image: image,
                name: vi,
                company_id: company_id,
                hover: hover,
                sub_type: sub_type,
                color_id: color_id
            });

            var resType = await type.save();
            if (resType) {
                await SubType.updateOne({ _id: ObjectId(resType._id) }, { type_id: ObjectId(resType._id) });
                res.json({
                    status: 200,
                    message: "Success",
                    data: null
                });
            }
        } catch (err) {
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },


    addProduct: async (req, res) => {
        const { type_id, brand_id, name, href, company_id, dataProductColor, price } = req.body;
        var arrTemp = []
        if (type_id == null || type_id.trim() == ''
            || brand_id == null || brand_id.trim() == ''
            || name == null || name.trim() == ''
            || href == null || href.trim() == '') {
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return;
        }
        try {
            var cache = req.app.locals.cache
            cache.del("dataProduct");

            for (let i = 0; i < dataProductColor.length; i++) {
                arrTemp.push({
                    type_id: ObjectId(type_id),
                    brand_id: ObjectId(brand_id),
                    name: name,
                    href: href,
                    type_product: "0",
                    color_id: dataProductColor[i].color_id,
                    price: price,
                    image_link: dataProductColor[i].image_link,
                    company_id: company_id
                })

            }

            await Sku.insertMany(arrTemp)

            res.json({
                status: 200,
                message: "Success",
                data: null
            });

        } catch (err) {
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },

    addProduct_Hair: async (req, res) => {
        const { type_id, brand_id, name, href, company_id, dataProductColor, price } = req.body;
        var arrTemp = []
        if (type_id == null || type_id.trim() == ''
            || brand_id == null || brand_id.trim() == ''
            || name == null || name.trim() == ''
            || href == null || href.trim() == '') {
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return;
        }
        try {
            var cache = req.app.locals.cache
            cache.del("dataProduct");

            for (let i = 0; i < dataProductColor.length; i++) {
                arrTemp.push({
                    type_id: ObjectId(type_id),
                    brand_id: ObjectId(brand_id),
                    name: name,
                    href: href,
                    type_product: "1",
                    color_id: dataProductColor[i].color_id,
                    price: price,
                    image_link: dataProductColor[i].image_link,
                    company_id: company_id
                })

            }

            await Sku.insertMany(arrTemp)

            res.json({
                status: 200,
                message: "Success",
                data: null
            });

        } catch (err) {
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },

    addColor: async (req, res) => {
        const { product_id, hex, makeup_id, alpha, company_id } = req.body;
        if (hex == null || hex.trim() == ''
            || makeup_id == null || makeup_id.trim() == ''
            || alpha == null) {
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return;
        }
        try {
            var cache = req.app.locals.cache
            cache.del(["dataColor", "arrSub"]);

            const color = new Color({
                product_id: ObjectId(product_id),
                hex: hex,
                makeup_id: makeup_id,
                alpha: Number(alpha),
                company_id: company_id
            });

            await color.save();

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        } catch (err) {
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },

    updateBrand: async (req, res) => {
        const { id, name, image, link, image_link } = req.body;
        if (id == null || id.trim() == ''
            || name == null || name.trim() == ''
            || image == null || image.trim() == '') {
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return;
        }
        try {
            const update = {
                name: name,
                //image: image,
                image_link: image_link,
                link: link
            };

            await Brand.updateOne({ _id: ObjectId(id) }, update);

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        } catch (err) {
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },
    updateType: async (req, res) => {
        const { id, vi, image, status, hover, sub_type, color_id } = req.body;
        if (id == null || id.trim() == ''
            || vi == null || vi.trim() == ''
            || image == null || image.trim() == '') {
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return;
        }
        try {
            const update = {
                vi: vi,
                image: image,
                name: vi,
                isNull: status,
                hover: hover,
                sub_type: sub_type,
                color_id: color_id
            };

            await SubType.updateOne({ _id: ObjectId(id) }, update);

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        } catch (err) {
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },
    updateColor: async (req, res) => {
        var cache = req.app.locals.cache
        cache.del(["dataColor", "arrSub"]);
        const { id, product_id, hex, makeup_id, alpha } = req.body;
        if (id == null || id.trim() == ''
            || hex == null || hex.trim() == ''
            || makeup_id == null || makeup_id.trim() == ''
            || alpha == null) {
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return;
        }
        try {
            const update = {
                product_id: ObjectId(product_id),
                hex: hex,
                makeup_id: makeup_id,
                alpha: Number(alpha)
            };

            await Color.updateOne({ _id: ObjectId(id) }, update);

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        } catch (err) {
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },
    updateProduct: async (req, res) => {
        const { id, type_id, brand_id, name, href, price, color_id, image_link } = req.body

        try {
            var cache = req.app.locals.cache
            cache.del("dataProduct");

            const update = {
                type_id: ObjectId(type_id),
                brand_id: ObjectId(brand_id),
                name: name,
                href: href,
                price: price,
                image_link: image_link,
                color_id: color_id
            };

            await Sku.updateOne({ _id: ObjectId(id) }, update);

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        } catch (err) {
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },
    deleteColor: async (req, res) => {
        const { id } = req.body
        var cache = req.app.locals.cache
        cache.del("dataProduct");

        if (id == null || id.trim() == '') {
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return;
        }

        try {
            var cache = req.app.locals.cache
            cache.del(["dataColor", "arrSub"]);

            await Color.deleteOne({ _id: ObjectId(id) });

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        } catch (err) {
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },
    deleteType: async (req, res) => {
        const { id } = req.body
        if (id == null || id.trim() == '') {
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return;
        }

        try {
            const p = await Sku.find({ type_id: ObjectId(id) });

            if (p.length > 0) {
                res.json({
                    status: 201,
                    message: "Please remove all products with type {name} before removing {name}",
                    data: null
                });
                return;
            }

            await SubType.deleteOne({ _id: ObjectId(id) });

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        } catch (err) {
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },
    deleteProduct: async (req, res) => {
        const { id } = req.body
        var cache = req.app.locals.cache
        cache.del("dataProduct");

        if (id == null || id.trim() == '') {
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return;
        }

        try {
            // const p = await Color.find({ product_id: ObjectId(id) });

            // if (p.length > 0) {
            //     res.json({
            //         status: 201,
            //         message: "Please remove all color with product {name} before removing {name}",
            //         data: null
            //     });
            //     return;
            // }

            await Sku.deleteOne({ _id: ObjectId(id) });

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        } catch (err) {
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },
    deleteBrand: async (req, res) => {
        const { id } = req.body
        if (id == null || id.trim() == '') {
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return;
        }

        try {
            const p = await Sku.find({ brand_id: ObjectId(id) });

            if (p.length > 0) {
                res.json({
                    status: 201,
                    message: "Please remove all products with brand {name} before removing {name}",
                    data: null
                });
                return;
            }

            await Brand.deleteOne({ _id: ObjectId(id) });

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        } catch (err) {
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },

    filterSuggestItem: async (req, res) => {
        try {
            let body = req.body;

            let result = await Item.find({ companyid: ObjectId(body.company_id), type_product_id: body.type_product_id }).populate("type_sdk_id", 'Name').populate("type_product_id", 'Name');
            let arrResult = lodash.reverse(result);
            let arrTemp = [];
            for (let i = 0; i < 50; i++) {
                for (let y = 0; y < arrResult.length; y++) {
                    let number = Number(arrResult[y].type_sdk_id.Name.substring(1, arrResult[y].type_sdk_id.Name.length))
                    if (number == i) {
                        arrTemp.push(arrResult[y])
                    }
                }
            }

            if (result) {
                res.send(Response(200, "Success", arrTemp, true));
            } else {
                res.send(Response(202, "Fail", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    addOrderAutomatic: async (req, res) => {
        try {
            let body = req.body;

            let resUser = await User.findOne({ _id: body.user_id });
            let company_id = resUser.Company_Id;
            let resPackage = await Package.find();

            for (let i = 0; i < resPackage.length; i++) {
                const addOrder = await PluginOrder.create({
                    "Company_Id": company_id,
                    "Package_Id": resPackage[i]._id,
                    "Array_Feature": resPackage[i].Array_Feature,
                    "Active_Date": Date.now(),
                    "End_Date": calTime(resPackage[i].Unit, resPackage[i].Value),
                    "Status": "1"
                });

                if (addOrder) {
                    console.log("Ok")
                } else {
                    console.log("Fail")
                }
            }

            if (resPackage) {
                res.send(Response(200, "Success", resPackage, true));
            } else {
                res.send(Response(202, "Fail", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    dataSync: async (req, res) => {
        try {
            var brand = await Brand.find({
                $or: [{ image_link: null }, { image_link: '' }],
                name: { $ne: "Nectaya" }
            }).limit(10)

            var brand_plugin = await BrandPlugin.find({
                $or: [{ image_link: null }, { image_link: '' }],
                name: { $ne: "Nectaya" }
            }).limit(10)

            for(let i = 0; i < brand.length; i++) {
                let matches = brand[i].image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
                response = {};

                if (matches.length !== 3) {
                    res.send(Response(202, 'Invalid input string', err, false));
                }

                response.type = matches[1];
                response.data = new Buffer(matches[2], 'base64');

                fs.writeFile("public/image_brand/" + brand[i]._id + "_" + i + ".png", response.data, async function(err) { 
                    if(err == null){
                        console.log(brand[i]._id + "_" + i + ".png")
                        await Brand.updateMany({ _id: brand[i]._id }, { image_link: brand[i]._id + "_" + i + ".png" });
                    } else {
                        console.log(err)
                    }
                });
            }

            for(let i = 0; i < brand_plugin.length; i++) {
                let matches = brand_plugin[i].image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
                response = {};

                if (matches.length !== 3) {
                    res.send(Response(202, 'Invalid input string', err, false));
                }

                response.type = matches[1];
                response.data = new Buffer(matches[2], 'base64');

                fs.writeFile("public/image_brand/" + brand_plugin[i]._id + "_" + i + ".png", response.data, async function(err) { 
                    if(err == null){
                        console.log(brand_plugin[i]._id + "_" + i + ".png")
                        await BrandPlugin.updateMany({ _id: brand_plugin[i]._id }, { image_link: brand_plugin[i]._id + "_" + i + ".png" });
                    } else {
                        console.log(err)
                    }
                });
            }
            res.send(Response(202, "Ok", "Ok", false));

        } catch (err) {
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },
}