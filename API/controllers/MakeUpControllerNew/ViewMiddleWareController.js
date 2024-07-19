var request = require("request");
const { ObjectID } = require("mongodb");
const ViewMiddle = require("../../models/ViewMiddleWare");
const CompanyPlugin = require("../../models/PluginCollection/CompanyPluginModel");
const TypeProduct = require("../../models/MakeUpCollection/type_product");
const Sku = require("../../models/MakeUpCollection/item");
const Product = require("../../models/MakeUpCollection/product");
const Color = require("../../models/MakeUpCollection/color");
const Dictionary = require("../../models/DictionaryModel");
const Response = require("../../helpers/Response");
const Brand = require('../../models/MakeUpCollection/brand')
const BrandPlugin = require('../../models/PluginCollection/BrandPluginModel')
const lodash = require("lodash");
var stringSimilarity = require("string-similarity");

async function convertName(arr, arrId) {
    const data2 = await CompanyPlugin.find({ _id: { $in: arrId } }, `Name`).lean()

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].company_name == "") {
            arr[i].company_name = "Eucerin"
        } else {
            for (let y = 0; y < data2.length; y++) {
                if (String(data2[y]._id) == String(arr[i].company_name)) {
                    arr[i].company_name = data2[y].Name
                }
            }
        }
    }

    return arr
}

async function groupByArr(dataSku, value) {
    let grouppedArray = lodash.chain(dataSku).groupBy(value)
        .map((value, key) => ({ company_name: key, data: value }))
        .value()

    return grouppedArray
}

async function groupByArr_Type(dataSku, value) {
    let grouppedArray = lodash.chain(dataSku).groupBy(value)
        .map((value, key) => ({ type: key, data: value }))
        .value()

    return grouppedArray
}

async function similarity(data, dataKey) {

    let arrData = [];

    for (let i = 0; i < data.length; i++) {
        for (let y = 0; y < dataKey.length; y++) {
            let similarity =
                stringSimilarity.compareTwoStrings(String(data[i].Name).toLowerCase(), String(dataKey[y]).toLowerCase());

            if ((similarity * 100) >= 30) {
                arrData.push(data[i]._id)
            }
        }
    }

    return arrData;
}

async function getDataByModelSku(arrComId, arrBrandId, arrKeyDictionary, skip, keyLimit) {

    var dataSku = await Sku.find({
        $or: [{
            companyid: { $in: arrComId }
        }, {
            brand_id: { $in: arrBrandId }
        }, {
            type_product_id: { $in: arrKeyDictionary }
        }]
    }, `image_link name title companyid brand_id sdktype type_product_id linkdetail`)
        .populate("type_product_id", `Name TypeSDK`)
        .populate("brand_id", `name`)
        .skip(skip).limit(keyLimit)
        .lean()

    return dataSku
}

module.exports = {
    getDataUsePlugin: async (req, res) => {
        try {
            const limit = 10;
            const { result } = req.body;
            const viewMiddle = await ViewMiddle.find({ type: 0 }).lean().limit(limit);
            const arrSlug = [];
            const arrComId = [];
            const arrComName = [];
            const arrResult = [];
            const arrTempLevel = [];
            const arrSDK = [];
            const arrLevel = [];
            const arrSort = [];

            var arrReverse = lodash.reverse(viewMiddle);
            if (arrReverse.length > 0) {
                for (let i = 0; i < arrReverse.length; i++) {
                    arrSlug.push(arrReverse[i].slug);
                }

                const resCom = await CompanyPlugin.find({ Slug: { $in: arrSlug } }).lean();

                for (let i = 0; i < arrSlug.length; i++) {
                    let sort = lodash.find(resCom, { Slug: arrSlug[i] });
                    arrSort.push(sort._id);
                    arrComName.push(sort.Name);
                }

                for (let i = 0; i < resCom.length; i++) {
                    arrComId.push(resCom[i]._id);
                }

                for (let i = 0; i < result.length; i++) {
                    arrSDK.push(result[i].sdktype);
                    arrLevel.push(result[i].level);
                }

                var listLevel = await TypeProduct.find({
                    TypeSDK: { $in: arrLevel },
                }).lean();

                for (let i = 0; i < listLevel.length; i++) {
                    let check = lodash.find(result, { level: listLevel[i].TypeSDK });
                    check.level = listLevel[i]._id;
                    if (listLevel[i].TypeSDK != "K1") {
                        arrTempLevel.push(check.level);
                    }
                }

                var dataSku = await Sku.find({
                    companyid: { $in: arrComId },
                    sdktype: { $in: arrSDK },
                    type_product_id: { $in: arrTempLevel }
                },
                    `image_link name companyid sdktype type_product_id linkdetail title`).populate("type_product_id", `Name TypeSDK`)
                for (let i = 0; i < arrSort.length; i++) {
                    let sort = lodash.filter(dataSku, { companyid: String(arrSort[i]) });

                    let grouppedArray = await groupByArr_Type(sort, "type_product_id.Name")

                    arrResult.push({ company: arrComName[i], data: grouppedArray })
                }

                res.send(Response(200, "Lấy dữ liệu thành công !!!", arrResult, false));
            } else {
                res.send(
                    Response(202, "Hệ thống đang cập nhật số liệu vui lòng thử lại sau vài phút !!!", null, false)
                );
            }
        } catch (err) {
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },

    getDataUseMakeUp: async (req, res) => {
        try {
            const limit = 10;
            const { color } = req.body;
            const arrSlug = []
            const arrSort = []
            const arrComName = []
            const arrComId = []
            const arrResult = []
            const viewMiddle = await ViewMiddle.find({ type: 1 }).lean().limit(limit);
            var arrReverse = lodash.reverse(viewMiddle);

            if (arrReverse.length > 0) {
                for (let i = 0; i < arrReverse.length; i++) {
                    arrSlug.push(arrReverse[i].slug);
                }

                const resCom = await CompanyPlugin.find({ Slug: { $in: arrSlug } }).lean();
                for (let i = 0; i < arrSlug.length; i++) {
                    let sort = lodash.find(resCom, { Slug: arrSlug[i] });
                    arrSort.push(sort._id);
                    arrComName.push(sort.Name);
                }

                for (let i = 0; i < resCom.length; i++) {
                    arrComId.push(resCom[i]._id);
                }
                var currentColorID = await Color.findOne({ hex: color }, `hex company_id`).lean();
                var dataProduct = await Product.find({ company_id: { $in: arrComId }, color_id: currentColorID._id },
                    `image_link name company_id href type_product`).lean();

                for (let i = 0; i < arrSort.length; i++) {
                    let sort = lodash.filter(dataProduct, { company_id: String(arrSort[i]) });

                    arrResult.push({ company: arrComName[i], data: sort })
                }
                res.send(Response(200, "Lấy dữ liệu thành công !!!", arrResult, false));
            } else {
                res.send(
                    Response(202, "Hệ thống đang cập nhật số liệu vui lòng thử lại sau vài phút !!!", null, false)
                );
            }

        } catch (err) {
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },

    SearchPlugin: async (req, res) => {
        try {
            let { key, type, page } = req.body;
            let arrComId = [];
            let arrBrandId = [];
            let arrKey = [];
            let arrKeyBrand = [];
            const arrKeyProduct = [];
            const keyLimit = 10;
            const arrKeyDictionary = []
            if (key) {
                if (key != " ") {
                    var splitKey = key.split(" ")

                    for (let i = 0; i < splitKey.length; i++) {
                        const searchKey = splitKey[i].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
                        arrKeyProduct.push(searchKey)
                        arrKey.push({ "Name": { "$regex": new RegExp(searchKey, "i") } }, { "Slug": { "$regex": new RegExp(searchKey, "i") } })
                        arrKeyBrand.push({ "name": { "$regex": new RegExp(searchKey, "i") } })
                    }

                    const data = await CompanyPlugin.find({ $or: arrKey }, `Name`).lean()
                    const dataBrand = await BrandPlugin.find({ $or: arrKeyBrand }, `name`).lean()
                    const dataDictionary = await Dictionary.find({}, `key id_type`).lean()

                    arrComId = await similarity(data, arrKeyProduct)

                    arrBrandId = await similarity(dataBrand, arrKeyProduct)

                    if (type == "" || type == null || type == undefined) {
                        for (let i = 0; i < dataDictionary.length; i++) {
                            if (key.toLowerCase().includes(dataDictionary[i].key.toLowerCase())) {
                                if (arrKeyDictionary.includes(dataDictionary[i].id_type) == false) {
                                    arrKeyDictionary.push(dataDictionary[i].id_type)
                                }
                            }
                        }
                    }

                    const count = await Sku.countDocuments({
                        $or: [{
                            companyid: { $in: arrComId }
                        }, {
                            brand_id: { $in: arrBrandId }
                        }, {
                            type_product_id: { $in: arrKeyDictionary }
                        }]
                    }).lean();

                    const skip = count - (Number(page == null || page == undefined || page == "" ? 1 : page) * keyLimit);

                    if (skip > 0) {
                        var dataSku = await getDataByModelSku(arrComId, arrBrandId, arrKeyDictionary, skip, keyLimit)
                    } else {
                        var dataSku = await getDataByModelSku(arrComId, arrBrandId, arrKeyDictionary, count - (skip + keyLimit), keyLimit)
                    }

                    let grouppedArray = await groupByArr(dataSku, "companyid")

                    var valueType = await TypeProduct.findOne({
                        TypeSDK: type,
                    }).lean();

                    let check = 0;
                    let arrRM = []
                    if (type == "" || type == null || type == undefined) {

                        if (arrKeyDictionary.length == 0) {
                            for (let i = 0; i < grouppedArray.length; i++) {
                                let tempData = grouppedArray[i].data;
                                let dataMerge = await groupByArr_Type(tempData, "type_product_id.Name")

                                grouppedArray[i].data = dataMerge
                            }
                        } else {
                            let arrTemp = [];
                            let arrRM_Item = [];

                            for (let i = 0; i < grouppedArray.length; i++) {
                                let dataMerge = await groupByArr_Type(grouppedArray[i].data, "type_product_id.Name")

                                grouppedArray[i].data = dataMerge

                                let tempData = grouppedArray[i].data;
                                for (let y = 0; y < tempData.length; y++) {
                                    let teamp_y_data = tempData[y].data
                                    for (let z = 0; z < teamp_y_data.length; z++) {
                                        if (arrKeyDictionary.includes(
                                            String(teamp_y_data[z].type_product_id._id))) {
                                            arrTemp.push(teamp_y_data[z])
                                        }
                                    }

                                    if (arrTemp.length == 0) {
                                        arrRM_Item.push(y)
                                    }

                                    grouppedArray[i].data[y].data = arrTemp

                                    arrTemp = []
                                }

                                for (let index = arrRM_Item.length - 1; index >= 0; index--) {
                                    grouppedArray[i].data.splice(arrRM_Item[index], 1);
                                }

                                arrRM_Item = []
                            }

                        }
                    } else {
                        let arrFoundProductByKey = []
                        for (let i = 0; i < grouppedArray.length; i++) {
                            let tempData = grouppedArray[i].data;
                            for (let y = 0; y < tempData.length; y++) {
                                if (String(tempData[y].type_product_id._id) == String(valueType._id)) {
                                    arrFoundProductByKey.push(tempData[y])
                                    check = check + 1;
                                }
                            }

                            if (check > 0) {
                                grouppedArray[i].data = [{
                                    type: valueType.Name,
                                    data: arrFoundProductByKey
                                }];

                                arrFoundProductByKey = [];
                            } else {
                                grouppedArray[i].data = [{
                                    type: valueType.Name,
                                    data: []
                                }]
                            }

                            if (grouppedArray[i].data[0].data.length == 0) {
                                arrRM.push(i)
                            }
                        }
                    }

                    if (type != "" && type != null && type != undefined) {
                        for (var i = arrRM.length - 1; i >= 0; i--) {
                            grouppedArray.splice(arrRM[i], 1);
                        }
                    }

                    let arrID = []
                    for (let i = 0; i < grouppedArray.length; i++) {
                        if (grouppedArray[i].company_name != "") {
                            arrID.push(grouppedArray[i].company_name)
                        }
                    }

                    let dataGroupped = await convertName(grouppedArray, arrID)

                    res.send(Response(200, "Lấy dữ liệu thành công !!!", dataGroupped, true,
                        { total_company: dataGroupped.length, total_page: Math.ceil(count / keyLimit) }));
                } else {
                    res.send(Response(202, "Có chứa khoảng trống !!!", [], false));
                }
            }
        } catch (err) {
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },

    SearchPluginQuery: async (req, res) => {
        try {
            let { key, type, page } = req.query;
            let arrComId = [];
            let arrBrandId = [];
            let arrKey = [];
            let arrKeyBrand = [];
            const arrKeyProduct = [];
            const keyLimit = 10;
            const arrKeyDictionary = []
            if (key) {
                if (key != " ") {
                    var splitKey = key.split(" ")

                    for (let i = 0; i < splitKey.length; i++) {
                        const searchKey = splitKey[i].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
                        arrKeyProduct.push(searchKey)
                        arrKey.push({ "Name": { "$regex": new RegExp(searchKey, "i") } }, { "Slug": { "$regex": new RegExp(searchKey, "i") } })
                        arrKeyBrand.push({ "name": { "$regex": new RegExp(searchKey, "i") } })
                    }

                    const data = await CompanyPlugin.find({ $or: arrKey }, `Name`).lean()
                    const dataBrand = await BrandPlugin.find({ $or: arrKeyBrand }, `name`).lean()
                    const dataDictionary = await Dictionary.find({}, `key id_type`).lean()

                    arrComId = await similarity(data, arrKeyProduct)

                    arrBrandId = await similarity(dataBrand, arrKeyProduct)

                    if (type == "" || type == null || type == undefined) {
                        for (let i = 0; i < dataDictionary.length; i++) {
                            if (key.toLowerCase().includes(dataDictionary[i].key.toLowerCase())) {
                                if (arrKeyDictionary.includes(dataDictionary[i].id_type) == false) {
                                    arrKeyDictionary.push(dataDictionary[i].id_type)
                                }
                            }
                        }
                    }

                    const count = await Sku.countDocuments({
                        $or: [{
                            companyid: { $in: arrComId }
                        }, {
                            brand_id: { $in: arrBrandId }
                        }, {
                            type_product_id: { $in: arrKeyDictionary }
                        }]
                    }).lean();

                    const skip = count - (Number(page == null || page == undefined || page == "" ? 1 : page) * keyLimit);

                    if (skip > 0) {
                        var dataSku = await getDataByModelSku(arrComId, arrBrandId, arrKeyDictionary, skip, keyLimit)
                    } else {
                        var dataSku = await getDataByModelSku(arrComId, arrBrandId, arrKeyDictionary, count - (skip + keyLimit), keyLimit)
                    }

                    let grouppedArray = await groupByArr(dataSku, "companyid")

                    var valueType = await TypeProduct.findOne({
                        TypeSDK: type,
                    }).lean();

                    let check = 0;
                    let arrRM = []
                    if (type == "" || type == null || type == undefined) {

                        if (arrKeyDictionary.length == 0) {
                            for (let i = 0; i < grouppedArray.length; i++) {
                                let tempData = grouppedArray[i].data;
                                let dataMerge = await groupByArr_Type(tempData, "type_product_id.Name")

                                grouppedArray[i].data = dataMerge
                            }
                        } else {
                            let arrTemp = [];
                            let arrRM_Item = [];

                            for (let i = 0; i < grouppedArray.length; i++) {
                                let dataMerge = await groupByArr_Type(grouppedArray[i].data, "type_product_id.Name")

                                grouppedArray[i].data = dataMerge

                                let tempData = grouppedArray[i].data;
                                for (let y = 0; y < tempData.length; y++) {
                                    let teamp_y_data = tempData[y].data
                                    for (let z = 0; z < teamp_y_data.length; z++) {
                                        if (arrKeyDictionary.includes(
                                            String(teamp_y_data[z].type_product_id._id))) {
                                            arrTemp.push(teamp_y_data[z])
                                        }
                                    }

                                    if (arrTemp.length == 0) {
                                        arrRM_Item.push(y)
                                    }

                                    grouppedArray[i].data[y].data = arrTemp

                                    arrTemp = []
                                }

                                for (let index = arrRM_Item.length - 1; index >= 0; index--) {
                                    grouppedArray[i].data.splice(arrRM_Item[index], 1);
                                }

                                arrRM_Item = []
                            }

                        }
                    } else {
                        let arrFoundProductByKey = []
                        for (let i = 0; i < grouppedArray.length; i++) {
                            let tempData = grouppedArray[i].data;
                            for (let y = 0; y < tempData.length; y++) {
                                if (String(tempData[y].type_product_id._id) == String(valueType._id)) {
                                    arrFoundProductByKey.push(tempData[y])
                                    check = check + 1;
                                }
                            }

                            if (check > 0) {
                                grouppedArray[i].data = [{
                                    type: valueType.Name,
                                    data: arrFoundProductByKey
                                }];

                                arrFoundProductByKey = [];
                            } else {
                                grouppedArray[i].data = [{
                                    type: valueType.Name,
                                    data: []
                                }]
                            }

                            if (grouppedArray[i].data[0].data.length == 0) {
                                arrRM.push(i)
                            }
                        }
                    }

                    if (type != "" && type != null && type != undefined) {
                        for (var i = arrRM.length - 1; i >= 0; i--) {
                            grouppedArray.splice(arrRM[i], 1);
                        }
                    }

                    let arrID = []
                    for (let i = 0; i < grouppedArray.length; i++) {
                        if (grouppedArray[i].company_name != "") {
                            arrID.push(grouppedArray[i].company_name)
                        }
                    }

                    let dataGroupped = await convertName(grouppedArray, arrID)

                    res.send(Response(200, "Lấy dữ liệu thành công !!!", dataGroupped, true,
                        { total_company: dataGroupped.length, total_page: Math.ceil(count / keyLimit) }));
                } else {
                    res.send(Response(202, "Có chứa khoảng trống !!!", [], false));
                }
            }
        } catch (err) {
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },

    SearchMakeUp: async (req, res) => {
        try {
            const { key, page } = req.body;
            const arrComId = [];
            const arrKeyProduct = [];
            const arrKey = [];
            const arrBrandId = [];
            const arrKeyBrand = [];
            const keyLimit = 10;
            if (key) {

                var splitKey = key.split(" ")

                for (let i = 0; i < splitKey.length; i++) {
                    const searchKey = splitKey[i].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
                    arrKeyProduct.push(searchKey)
                    arrKey.push({ "Name": { "$regex": new RegExp(searchKey, "i") } }, { "Slug": { "$regex": new RegExp(searchKey, "i") } })
                    arrKeyBrand.push({ "name": { "$regex": new RegExp(searchKey, "i") } })
                }

                const data = await CompanyPlugin.find({ $or: arrKey }).lean();
                const dataBrand = await Brand.find({ $or: arrKeyBrand }, `name`).lean()

                for (let i = 0; i < data.length; i++) {
                    for (let y = 0; y < arrKeyProduct.length; y++) {
                        let similarity =
                            stringSimilarity.compareTwoStrings(String(data[i].Name).toLowerCase(), String(arrKeyProduct[y]).toLowerCase());

                        if ((similarity * 100) >= 30) {
                            arrComId.push(data[i]._id)
                        }
                    }
                }

                for (let i = 0; i < dataBrand.length; i++) {
                    for (let y = 0; y < arrKeyProduct.length; y++) {
                        let similarity =
                            stringSimilarity.compareTwoStrings(String(dataBrand[i].name).toLowerCase(), String(arrKeyProduct[y]).toLowerCase());

                        if ((similarity * 100) >= 30) {
                            arrBrandId.push(ObjectID(dataBrand[i]._id))
                        }
                    }
                }
                const count = await Product.countDocuments({
                    $or: [{
                        company_id: { $in: arrComId }
                    }, {
                        brand_id: { $in: arrBrandId }
                    }]
                }).lean();

                const skip = count - (Number(page == null || page == undefined || page == "" ? 1 : page) * keyLimit);

                if (skip >= 0) {
                    var dataProduct = await Product.find({
                        $or: [{
                            company_id: { $in: arrComId }
                        }, {
                            brand_id: { $in: arrBrandId }
                        }]
                    }, `image_link name company_id brand_id href type_product`)
                        .populate("company_id", "Name").populate("brand_id", "name")
                        .skip(skip).limit(keyLimit).lean();
                } else {
                    var dataProduct = await Product.find({
                        $or: [{
                            company_id: { $in: arrComId }
                        }, {
                            brand_id: { $in: arrBrandId }
                        }]
                    }, `image_link name company_id brand_id href type_product`)
                        .populate("company_id", "Name").populate("brand_id", "name")
                        .skip(count - (skip + keyLimit)).limit(keyLimit).lean();
                }

                let grouppedArray = await groupByArr(dataProduct, "company_id.Name")


                // let arrFoundProductByKey = []
                // let index = 0;
                // for (let i = 0; i < grouppedArray.length; i++) {
                //     let tempData = grouppedArray[i].data;
                //     for (let y = 0; y < tempData.length; y++) {
                //         for (let z = 0; z < arrKeyProduct.length; z++) {
                //             if (Number(tempData[y].name.search(new RegExp(arrKeyProduct[z], "i"))) > -1) {
                //                 arrFoundProductByKey.push(tempData[y])
                //                 index = index + 1;
                //             }
                //         }
                //     }
                //     if (index > 0) {
                //         grouppedArray[i].data = arrFoundProductByKey;
                //         arrFoundProductByKey = [];
                //     }
                // }

                let lengthData = 0;

                for (let i = 0; i < grouppedArray.length; i++) {
                    lengthData = lengthData + grouppedArray[i].data.length
                }

                res.send(Response(200, "Lấy dữ liệu thành công !!!", grouppedArray, true, { total_company: grouppedArray.length, total_page: Math.ceil(lengthData / keyLimit) }));
            }
        } catch (err) {
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },

    SearchMakeUpQuery: async (req, res) => {
        try {
            let { key, page } = req.query;
            let arrComId = [];
            let arrKeyProduct = [];
            let arrKey = [];
            let arrBrandId = [];
            let arrKeyBrand = [];
            let keyLimit = 10;
            if (key) {

                var splitKey = key.split(" ")

                for (let i = 0; i < splitKey.length; i++) {
                    const searchKey = splitKey[i].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
                    arrKeyProduct.push(searchKey)
                    arrKey.push({ "Name": { "$regex": new RegExp(searchKey, "i") } }, { "Slug": { "$regex": new RegExp(searchKey, "i") } })
                    arrKeyBrand.push({ "name": { "$regex": new RegExp(searchKey, "i") } })
                }

                const data = await CompanyPlugin.find({ $or: arrKey }).lean();
                const dataBrand = await Brand.find({ $or: arrKeyBrand }, `name`).lean()

                arrComId = await similarity(data, arrKeyProduct)
                arrBrandId = await similarity(dataBrand, arrKeyProduct)

                const count = await Product.countDocuments({
                    $or: [{
                        company_id: { $in: arrComId }
                    }, {
                        brand_id: { $in: arrBrandId }
                    }]
                }).lean();

                const skip = count - (Number(page == null || page == undefined || page == "" ? 1 : page) * keyLimit);

                if (skip >= 0) {
                    var dataProduct = await Product.find({
                        $or: [{
                            company_id: { $in: arrComId }
                        }, {
                            brand_id: { $in: arrBrandId }
                        }]
                    }, `image_link name company_id brand_id href type_product`)
                        .populate("company_id", "Name").populate("brand_id", "name")
                        .skip(skip).limit(keyLimit).lean();
                } else {
                    var dataProduct = await Product.find({
                        $or: [{
                            company_id: { $in: arrComId }
                        }, {
                            brand_id: { $in: arrBrandId }
                        }]
                    }, `image_link name company_id brand_id href type_product`)
                        .populate("company_id", "Name").populate("brand_id", "name")
                        .skip(count - (skip + keyLimit)).limit(keyLimit).lean();
                }

                let grouppedArray = await groupByArr(dataProduct, "company_id.Name")

                let lengthData = 0;

                for (let i = 0; i < grouppedArray.length; i++) {
                    lengthData = lengthData + grouppedArray[i].data.length
                }

                res.send(Response(200, "Lấy dữ liệu thành công !!!", grouppedArray, true, { total_company: grouppedArray.length, total_page: Math.ceil(lengthData / keyLimit) }));
            }
        } catch (err) {
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },

    RevertData: async (req, res) => {
        try {
            // const { data } = req.body;
            // let arrData = []
            // for(let i = 0; i < data.length; i++) {
            //     if(data[i].sdktype == "1") {
            //         data[i].name_level = "Nhẹ"
            //         data[i].brand_id = "613e17a64997d20ee4ba091e"
            //         data[i].image_link = ""
            //         arrData.push(data[i])
            //     } else if(data[i].sdktype == "2") {
            //         data[i].name_level = "Trung"
            //         data[i].brand_id = "613e17a64997d20ee4ba091e"
            //         data[i].image_link = ""
            //         arrData.push(data[i])
            //     } else if(data[i].sdktype == "3") {
            //         data[i].name_level = "Cao"
            //         data[i].brand_id = "613e17a64997d20ee4ba091e"
            //         data[i].image_link = ""
            //         arrData.push(data[i])
            //     } 
            // }

            // let arrResult = []
            // for(let i = 0; i < arrData.length; i++) {
            //     if(arrData[i].level == "K1") {
            //         arrData[i].type_sdk_id = "610112f2dbca4244fc3c6ade"
            //         arrData[i].type_product_id = "61011256dbca4244fc3c6ad1"
            //         arrResult.push(arrData[i])
            //     } else if(arrData[i].level == "K5") {
            //         arrData[i].type_sdk_id = "61011300dbca4244fc3c6ae7"
            //         arrData[i].type_product_id = "61011279dbca4244fc3c6ad3"
            //         arrResult.push(arrData[i])
            //     } else if(arrData[i].level == "K6") {
            //         arrData[i].type_sdk_id = "61011302dbca4244fc3c6ae9"
            //         arrData[i].type_product_id = "61011281dbca4244fc3c6ad5"
            //         arrResult.push(arrData[i])
            //     } else if(arrData[i].level == "K7") {
            //         arrData[i].type_sdk_id = "61011306dbca4244fc3c6aeb"
            //         arrData[i].type_product_id = "6101128adbca4244fc3c6ad7"
            //         arrResult.push(arrData[i])
            //     } else if(arrData[i].level == "K8") {
            //         arrData[i].type_sdk_id = "61011309dbca4244fc3c6aed"
            //         arrData[i].type_product_id = "61011296dbca4244fc3c6ad9"
            //         arrResult.push(arrData[i])
            //     } else if(arrData[i].level == "K9") {
            //         arrData[i].type_sdk_id = "6101130cdbca4244fc3c6aef"
            //         arrData[i].type_product_id = "6101129fdbca4244fc3c6adb"
            //         arrResult.push(arrData[i])
            //     }
            // }

            // await Sku.insertMany(arrResult)
            // res.send(Response(200, "Lấy dữ liệu thành công !!!", arrResult, true));

        } catch (err) {
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },
};
