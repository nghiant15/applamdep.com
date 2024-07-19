const ObjectId = require('mongodb').ObjectId
const Brand = require('../../models/MakeUpCollection/brand')
const Type = require('../../models/MakeUpCollection/type')
const Sku = require('../../models/MakeUpCollection/product')
const Color = require('../../models/MakeUpCollection/color')
const SubType = require('../../models/MakeUpCollection/subType')

module.exports={
    getListBrand: async (req, res)=>{
        try{
            const {limit} = req.query;

            if(limit == null ){

                const cursor = await Brand.find();

                res.json({
                    status: 200,
                    message: "Success",
                    data: cursor
                });
            }else{
                const cursor = await Brand.find().limit(Number(limit));

                res.json({
                    status: 200,
                    message: "Success",
                    data: cursor
                });
            }
            
        }catch(err){
            res.json({
                status: 201,
                message: err.message,
                data: null
            });
        }
    },
    getSkuMakeup: async(req, res)=>{
        try{
            const {brand_id} = req.query;

            const makeupType = await Type
                .aggregate([
                    { $lookup:
                        {
                            from: 'tb_sub_type_makeups',
                            localField: '_id',
                            foreignField: 'type_id',
                            as: 'sub_type_makeup'
                        }
                    }
                ]);

            const sku = await Sku
            .find({brand_id: ObjectId(brand_id)});

            const color = await Color.find();

            let pro = [];
            sku.map(val=>{
                let hex = color.filter(v=>String(v.product_id) == String(val._id) && String(v.makeup_id) != '');
                if(hex.length > 0){
                    // val.color = hex;
                    pro.push(Object.assign(val.toObject(), {color: hex}));
                }
            })

            let result = [];
            makeupType.map(val=>{
                let sub_type = [];
                val.sub_type_makeup.map(sub=>{
                    let product = pro.filter(sku => String(sku.type_id) == String(sub._id));
                    if(product.length > 0){
                        sub.product = product;
                        sub_type.push(sub);
                    }
                })
                if(sub_type.length > 0){
                    val.sub_type_makeup = sub_type;
                    result.push(val);
                }
            })

            res.json({
                status: result.length > 0 ? 200 : 201,
                message: result.length > 0 ? 'Success' : "There is no sku list",
                data: result.length > 0 ? result : null
            });

        }catch(err){
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },
    getSku: async(req, res)=>{
        try{
            const {brand_id} = req.query;

            const subType = await SubType.find();

            const sku = await Sku
            .find({brand_id: ObjectId(brand_id)});

            const color = await Color.find();

            let pro = [];
            sku.map(val=>{
                let hex = color.filter(v=>String(v.product_id) == String(val._id) && String(v.makeup_id) != '');
                if(hex.length > 0){
                    pro.push(Object.assign(val.toObject(), {color: hex}));
                }
            })

            let result = [];
            subType.map(val=>{
                let product = pro.filter(sku => String(sku.type_id) == String(val._id))
                if(product.length > 0){
                    result.push(Object.assign(val.toObject(), {product: product}));
                }
            })

            res.json({
                status: result.length > 0 ? 200 : 201,
                message: result.length > 0 ? 'Success' : "There is no sku list",
                data: result.length > 0 ? result : null
            });

        }catch(err){
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },
    getBrand: async(req, res)=>{
        const brand = await Brand.find();

        res.json({
            status: 200,
            message: "Success",
            data: brand
        });
    },
    getType: async(req, res)=>{
        const type = await SubType.find();
        res.json({
            status: 200,
            message: "Success",
            data: type
        });
    },
    getProduct: async(req, res)=>{
        const brand = await Brand.find();
        const type = await SubType.find();
        const sku = await Sku.find();

        let result = [];

        sku.map(val=>{
            let arr = val;
            const b = brand.filter(v=> String(v['_id']) == String(val['brand_id']));
            const t = type.filter(v=> String(v['_id']) == String(val['type_id']));
            result.push(Object.assign(val.toObject(), {type: t[0].vi || t[0].name, brand: b[0].name}));
        });

        res.json({
            status: 200,
            message: "Success",
            data: result
        });
    },
    getColor: async(req, res)=>{
        const sku = await Sku.find();
        const color = await Color.find();

        let result = [];

        color.map(val=>{
            const s = sku.filter(v=>String(v['_id']) == String(val.product_id));
            result.push(Object.assign(val.toObject(), {product: s[0].name}));
        })

        res.json({
            status: 200,
            message: "Success",
            data: result
        });
    },
    addBrand: async(req, res)=>{
        const {name, image} = req.body;
        if(name == null || name.trim() == '' || image == null || image.trim() == ''){
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return
        }

        try{
            const brand = new Brand({
                name: name,
                image: image
            });

            await brand.save();

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        }catch(err){
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },
    addType: async(req, res)=>{
        const {image, vi} = req.body;
        if(vi == null || vi.trim() == '' || image == null || image.trim() == ''){
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return;
        }

        try{
            const type = new SubType({
                vi: vi,
                image: image,
                name: vi
            });

            await type.save();

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        }catch(err){
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },
    addProduct: async(req, res)=>{
        const {type_id, brand_id, name, href, image} = req.body;
        if(type_id == null || type_id.trim() == ''
        || brand_id == null || brand_id.trim() == ''
        || name == null || name.trim() == ''
        || href == null || href.trim() == ''
        || image == null || image.trim() == ''){
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return;
        }
        try{
            const product = new Sku({
                type_id: ObjectId(type_id),
                brand_id: ObjectId(brand_id),
                name: name,
                href: href,
                image: image
            });

            await product.save();

            res.json({
                status: 200,
                message: "Success",
                data: null
            });

        }catch(err){
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },
    addColor: async(req, res)=>{
        const {product_id, hex, makeup_id, alpha} = req.body;
        if(product_id == null || product_id.trim() == ''
        || hex == null || hex.trim() == ''
        || makeup_id == null || makeup_id.trim() == ''
        || alpha == null){
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return;
        }
        try{
            const color = new Color({
                product_id: ObjectId(product_id),
                hex: hex,
                makeup_id: makeup_id,
                alpha: Number(alpha)
            });

            await color.save();

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        }catch(err){
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },
    updateBrand: async(req, res)=>{
        const {id, name, image} = req.body;
        if(id == null || id.trim() == ''
        || name == null || name.trim() == ''
        || image == null || image.trim() == ''){
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return;
        }
        try{
            const update = {
                name: name,
                image: image
            };

            await Brand.updateOne({_id: ObjectId(id)}, update);

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        }catch(err){
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },
    updateType: async(req, res)=>{
        const {id, vi, image} = req.body;
        if(id == null || id.trim() == ''
        || vi == null || vi.trim() == ''
        || image == null || image.trim() == ''){
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return;
        }
        try{
            const update = {
                vi: vi,
                image: image,
                name: vi
            };

            await SubType.updateOne({_id: ObjectId(id)}, update);

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        }catch(err){
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },
    updateColor: async(req, res)=>{
        const {id, product_id, hex, makeup_id, alpha} = req.body;
        if(id == null || id.trim() == ''
        || product_id == null || product_id.trim() == ''
        || hex == null || hex.trim() == ''
        || makeup_id == null || makeup_id.trim() == ''
        || alpha == null){
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return;
        }
        try{
            const update = {
                product_id: ObjectId(product_id),
                hex: hex,
                makeup_id: makeup_id,
                alpha: Number(alpha)
            };

            await Color.updateOne({_id: ObjectId(id)}, update);

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        }catch(err){
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },
    updateProduct: async(req, res)=>{
        const {id, type_id, brand_id, name, href, image} = req.body
        if(id == null || id.trim() == ''
        || type_id == null || type_id.trim() == ''
        || brand_id == null || brand_id.trim() == ''
        || name == null || name.trim() == ''
        || href == null || href.trim() == ''
        || image == null || image.trim() == ''){
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return;
        }
        try{
            const update = {
                type_id: ObjectId(type_id),
                brand_id: ObjectId(brand_id),
                name: name,
                href: href,
                image: image
            };

            await Sku.updateOne({_id: ObjectId(id)}, update);

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        }catch(err){
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },
    deleteColor: async(req, res)=>{
        const {id} = req.body
        if(id == null || id.trim() == ''){
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return;
        }

        try{
            await Color.deleteOne({_id: ObjectId(id)});

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        }catch(err){
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },
    deleteType: async(req, res)=>{
        const {id} = req.body
        if(id == null || id.trim() == ''){
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return;
        }

        try{
            const p = await Sku.find({type_id: ObjectId(id)});

            if(p.length > 0){
                res.json({
                    status: 201,
                    message: "Please remove all products with type {name} before removing {name}",
                    data: null
                });
                return;
            }

            await SubType.deleteOne({_id: ObjectId(id)});

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        }catch(err){
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },
    deleteProduct: async(req, res)=>{
        const {id} = req.body
        if(id == null || id.trim() == ''){
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return;
        }

        try{
            const p = await Color.find({product_id: ObjectId(id)});

            if(p.length > 0){
                res.json({
                    status: 201,
                    message: "Please remove all color with product {name} before removing {name}",
                    data: null
                });
                return;
            }

            await Sku.deleteOne({_id: ObjectId(id)});

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        }catch(err){
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },
    deleteBrand: async(req, res)=>{
        const {id} = req.body
        if(id == null || id.trim() == ''){
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return;
        }

        try{
            const p = await Sku.find({brand_id: ObjectId(id)});

            if(p.length > 0){
                res.json({
                    status: 201,
                    message: "Please remove all products with brand {name} before removing {name}",
                    data: null
                });
                return;
            }

            await Brand.deleteOne({_id: ObjectId(id)});

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        }catch(err){
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    }
}