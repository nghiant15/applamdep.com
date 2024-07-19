const ObjectId = require('mongodb').ObjectId
const Brand = require('../../models/PluginCollection/BrandPluginModel')
const Sku = require('../../models/MakeUpCollection/product')


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
        const brand = await Brand.find({ $or: [{ company_id: company }] });
        const brandAdmin = await Brand.find()
            .or([{ company_id: undefined }, { company_id: null }, { company_id: '' }]);
        var arrTemp = []

        if(brand.length == 0) {
            for(let i = 0; i < brandAdmin.length; i++) {
                arrTemp.push({
                    name: brandAdmin[i].name,
                    image: brandAdmin[i].image,
                    image_link: brandAdmin[i].image_link,
                    link: brandAdmin[i].link,
                    company_id: company
                })
            }

            let resBrand = await Brand.insertMany(arrTemp)

            if(resBrand) {
                let brand = await Brand.find({ $or: [{ company_id: company }, { company_id: "1" }] });
                //console.log(brand)
                res.json({
                    status: 200,
                    message: "Success",
                    data: brand
                });
            }
        } else {
            res.json({
                status: 200,
                message: "Success",
                data: brand
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
}