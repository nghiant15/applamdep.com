const express = require("express");
const ObjectId = require("mongodb").ObjectId;
const router = express.Router();
const Item = require("../../models/MakeUpCollection/item");
const TypeSdk = require("../../models/MakeUpCollection/type_sdk");
const BrandPlugin = require('../../models/PluginCollection/BrandPluginModel')
const TypeProduct = require("../../models/MakeUpCollection/type_product");
const lodash = require('lodash')
const path = require('path')
const multer = require('multer')
const Response = require('../../helpers/Response');


router.get("/", async (req, res) => {
  
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 0;
    let opts = {};

    const data = await Item.find()
      .or([{ companyid: undefined }, { companyid: 1 }, { companyid: null }, { companyid: '' }])
      .populate("type_sdk_id", "Name Level")
      .populate("type_product_id", "Name")
      .populate("brand_id", "name image image_link ");

    const totalItems = await Item.countDocuments(opts);
    let dataRes = lodash.reverse(data)
    res.json({
      statusCode: 200,
      dataRes,
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / 1),
    });
  } catch (err) {
    res.send("Error " + err);
  }
});

router.get("/admin/search/:type", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 0;

    const { type } = req.params;
    const { skip, key } = req.query;
    const typeProduct = await TypeProduct.find();

    let totalIiem = await Item.countDocuments({ companyid: '', type_product_id: typeProduct[Number(type)]._id }).or([
      { name: { "$regex": new RegExp(key, "i") } }, { title: { "$regex": new RegExp(key, "i") } }
    ])
    let arrTotal = []
    for (let i = 0; i < Number(totalIiem); i++) {
      arrTotal.push(i);
    }


    //var skips = skip || arrTotal.length - 5;

    const data = await Item.find({ companyid: '', type_product_id: typeProduct[Number(type)]._id },
      `name 
        title 
        name_level 
        description
        sdktype 
        type_sdk_id 
        image_link
        linkdetail
        price
        brand_id 
        type_product_id 
        companyid`).or([
        { name: { "$regex": new RegExp(key, "i") } }, { title: { "$regex": new RegExp(key, "i") } }
      ])
      .populate("type_sdk_id", "Name Level")
      .populate("type_product_id", "Name")
      .populate("brand_id", "name image image_link")
    //.skip(Number(skips) <= 0 ? 0 : Number(skips)).limit(5);

    const totalItems = 0
    let dataRes = lodash.reverse(data)

    console.log(dataRes.length)
    res.json({
      statusCode: 200,
      dataRes,
      page,
      limit,
      totalItems,
      arrTotal,
      totalPages: Math.ceil(totalItems / 1),
    });
  } catch (err) {
    res.send("Error " + err);
  }
});

router.get("/search/:com_id/:type", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 0;

    const { com_id, type } = req.params;
    const { skip, key } = req.query;
    const typeProduct = await TypeProduct.find();

    let totalIiem = await Item.countDocuments({ companyid: com_id, type_product_id: typeProduct[Number(type)]._id }).or([
      { name: { "$regex": new RegExp(key, "i") } }, { title: { "$regex": new RegExp(key, "i") } }
    ])
    let arrTotal = []
    for (let i = 0; i < Number(totalIiem); i++) {
      arrTotal.push(i);
    }

    //var skips = skip || arrTotal.length - 5;

    const data = await Item.find({ companyid: com_id, type_product_id: typeProduct[Number(type)]._id },
      `name 
        title 
        name_level 
        sdktype 
        type_sdk_id 
        linkdetail
        price
        image_link
        brand_id 
        type_product_id 
        companyid`).or([
        { name: { "$regex": new RegExp(key, "i") } }, { title: { "$regex": new RegExp(key, "i") } }
      ])
      .populate("type_sdk_id", "Name Level")
      .populate("type_product_id", "Name")
      .populate("brand_id", "name image image_link")
    //.skip(Number(skips) <= 0 ? 0 : Number(skips)).limit(5);

    const totalItems = 0
    let dataRes = lodash.reverse(data)

    console.log(dataRes.length)
    res.json({
      statusCode: 200,
      dataRes,
      page,
      limit,
      totalItems,
      arrTotal,
      totalPages: Math.ceil(totalItems / 1),
    });
  } catch (err) {
    res.send("Error " + err);
  }
});

router.get("/admin/:type", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 0;
    const { type } = req.params;
    const typeProduct = await TypeProduct.find();

    let totalIiem = await Item.countDocuments({ type_product_id: typeProduct[Number(type)]._id, companyid: "" })
    let arrTotal = []
    for (let i = 0; i < Number(totalIiem); i++) {
      arrTotal.push(i);
    }

    var lengthArr = arrTotal.length;

    // if (lengthArr <= 20) {
    //   var skip = 0;
    // } else {
    var skip = req.query.skip || lengthArr - 5;
    //}

    if (Number(skip) <= 0) {
      var data = await Item.find({ companyid: "", type_product_id: typeProduct[Number(type)]._id },
        `name 
        title 
        name_level 
        sdktype 
        type_sdk_id 
        image_link
        price
        image
        linkdetail
        brand_id 
        description
        type_product_id 
        companyid`)
        .sort({ _id: -1 })
        .skip(lengthArr - (Number(skip) + 5))
        .limit(5)
        .populate("type_sdk_id", "Name Level")
        .populate("type_product_id", "Name")
    } else {
      var data = await Item.find({ companyid: "", type_product_id: typeProduct[Number(type)]._id },
        `name 
        title 
        name_level 
        sdktype 
        type_sdk_id 
        image_link
        price
        image
        description
        linkdetail
        brand_id 
        type_product_id 
        companyid`)
        // .sort({_id:-1})
        .populate("type_sdk_id", "Name Level")
        .populate("type_product_id", "Name").skip(Number(skip) <= 0 ? 0 : Number(skip))
        .limit(5)
    }

    const totalItems = 0

    const brand = await BrandPlugin.find({ $or: [{ company_id: null }, { company_id: "1" }] })
    let resultData = []

    data.map(val => {
      const b = brand.filter(v => String(v['_id']) == String(val['brand_id']));

      if(b.length == 0) {
        resultData.push(Object.assign(val.toObject(), { brand_id: { image: '', image_link: '', name: '', _id: '' } }));
      } else {
        resultData.push(Object.assign(val.toObject(), { brand_id: { image: b[0].image, image_link: b[0].image_link == null ? b[0].image : b[0].image_link, name: b[0].name, _id: b[0]._id } }));
      }
    });
    
    let dataRes = lodash.reverse(resultData)
    res.json({
      statusCode: 200,
      dataRes,
      page,
      limit,
      brand,
      totalItems,
      arrTotal,
      totalPages: Math.ceil(totalItems / 1),
    });
  } catch (err) {
    res.send("Error " + err);
  }
});



router.get("/:com_id/:type", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 0;

    const { com_id, type } = req.params;
    const typeProduct = await TypeProduct.find();

    let totalIiem = await Item.countDocuments({ companyid: com_id, type_product_id: typeProduct[Number(type)]._id })
    let arrTotal = []
    for (let i = 0; i < Number(totalIiem); i++) {
      arrTotal.push(i);
    }

    var lengthArr = arrTotal.length;

    var skip = req.query.skip || lengthArr - 5;

    if (Number(skip) <= 0) {
      var data = await Item.find({ companyid: com_id, type_product_id: typeProduct[Number(type)]._id },
        `name 
        title 
        name_level 
        description
        sdktype 
        type_sdk_id 
        image_link
        linkdetail
        price
        brand_id 
        type_product_id 
        companyid`)
        .sort({ _id: -1 })
        .skip((lengthArr - (Number(skip) + 5)) < 0 ? (lengthArr - (Number(skip) + 5)) - (lengthArr - (Number(skip) + 5)) : (lengthArr - (Number(skip) + 5)))
        .limit(5)
    } else {
      var data = await Item.find({ companyid: com_id, type_product_id: typeProduct[Number(type)]._id },
        `name 
        title 
        name_level 
        description
        sdktype 
        type_sdk_id 
        image_link
        linkdetail
        price
        brand_id 
        type_product_id 
        companyid`)
        // .sort({_id:-1})
        .skip(Number(skip) <= 0 ? 0 : Number(skip))
        .limit(5)
    }

    const brand = await BrandPlugin.find({ $or: [{ company_id: com_id  }, { company_id: "1" }]})
    const type_sdk = await TypeSdk.find()
    const type_product = await TypeProduct.find()

    let resultData = []

    data.map(val => {
      const b = brand.filter(v => String(v['_id']) == String(val['brand_id']));
      const sdk = type_sdk.filter(v => String(v['_id']) == String(val['type_sdk_id']));
      const product = type_product.filter(v => String(v['_id']) == String(val['type_product_id']));
      if(b.length == 0) {
        resultData.push(Object.assign(val.toObject(), { 
          brand_id: { image: '', image_link: '', name: '', _id: '' },
          type_sdk_id: { Name: sdk[0].Name, Level: sdk[0].Level, _id: sdk[0]._id },
          type_product_id: { Name: product[0].Name, _id: product[0]._id },
        }));
      } else {
        resultData.push(Object.assign(val.toObject(), { 
          brand_id: { image: b[0].image, image_link: b[0].image_link, name: b[0].name, _id: b[0]._id },
          type_sdk_id: { Name: sdk[0].Name, Level: sdk[0].Level, _id: sdk[0]._id },
          type_product_id: { Name: product[0].Name, _id: product[0]._id },
        }));
      }
    });

    const totalItems = 0
    let dataRes = lodash.reverse(resultData)

    res.json({
      statusCode: 200,
      dataRes,
      page,
      limit,
      brand,
      totalItems,
      arrTotal,
      totalPages: Math.ceil(totalItems / 1),
    });
  } catch (err) {
    res.send("Error " + err);
  }
});

router.get("/suggest", async (req, res) => {
  try {
    const { com_id, type, level, K } = req.query;
    let opts = {};
    const arrTemp = []
    const typeProduct = await TypeProduct.find();
    const data = await Item.find({
      companyid: com_id,
      type_product_id: typeProduct[Number(type)]._id,
      sdktype: level
    }).populate("type_sdk_id", "Name Level")
      .populate("type_product_id", "Name")
      .populate("brand_id", "name image image_link");

    let dataRes = lodash.reverse(data)

    for (let i = 0; i < dataRes.length; i++) {
      if (dataRes[i].type_sdk_id.Name == K) {
        arrTemp.push(dataRes[i])
      }
    }

    res.json({
      statusCode: 200,
      arrTemp,
    });
  } catch (err) {
    res.send("Error " + err);
  }
});

router.get("/:com_id", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 0;
    let opts = {};
    const { com_id } = req.params;
    const data = await Item.find({ companyid: com_id }).populate("type_sdk_id", "Name Level")
    .populate("type_product_id", "Name");

    const totalItems = await Item.countDocuments(opts);

    res.json({
      statusCode: 200,
      data,
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    });
  } catch (err) {
    res.send("Error " + err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.json(item);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.get("/itemByIds", async (req, res) => {
  try {
    let level = req.query.level;
    let sdktype = req.query.sdktype;
    const item = await Item.find(
      { level: level, sdktype: sdktype },
      { __v: 0 }
    );
    res.json(item);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.post("/deleteItem", async (req, res) => {
  try {
    const { id } = req.body;
    if (id == null || id.trim() == "") {
      res.json({
        status: 201,
        message: "Miss params",
        data: null,
      });
      return;
    }

    await Item.deleteOne({ _id: ObjectId(id) });

    res.json({
      status: 200,
      message: "Success",
      data: null,
    });
  } catch (err) {
    res.json({
      status: 201,
      message: err.message,
      data: null,
    });
  }
});

router.post("/", async (req, res) => {
  const { name, image, title, description, linkdetail, level, sdktype, type_sdk_id, brand_id, image_link, price } = req.body;
  const brand = await BrandPlugin.find({ $or: [{ company_id: req.body.companyid }, { company_id: "1" }]});
  const typeProduct = await TypeProduct.find();
  var name_level = ''

  if (sdktype == "1") {
    name_level = "Nhẹ"
  } else if (sdktype == "2") {
    name_level = "Trung"
  } else {
    name_level = "Cao"
  }
  const typeSdk = await TypeSdk.findOne({ _id: ObjectId(type_sdk_id) });

  if (typeSdk.Name == "K1") {
    var type_product_id = typeProduct[0]._id
  } else if (typeSdk.Name == "K5") {
    var type_product_id = typeProduct[1]._id
  } else if (typeSdk.Name == "K6") {
    var type_product_id = typeProduct[2]._id
  } else if (typeSdk.Name == "K7") {
    var type_product_id = typeProduct[3]._id
  } else if (typeSdk.Name == "K8") {
    var type_product_id = typeProduct[4]._id
  } else if (typeSdk.Name == "K9") {
    var type_product_id = typeProduct[5]._id
  }

  const item = new Item({
    name: name,
    // image: image,
    title: "",
    description: description,
    linkdetail: linkdetail,
    image_link: image_link,
    level: level,
    price: price,
    name_level: name_level,
    sdktype: sdktype,
    type_sdk_id: type_sdk_id,
    brand_id: brand_id == "" || brand_id == null || brand_id == undefined ? brand[0]._id : brand_id,
    type_product_id: type_product_id,
    companyid: req.body.companyid !== undefined ? req.body.companyid : "",
  });

  try {
    const a1 = await item.save();
    res.json(a1);
  } catch (err) {
    console.log("err", err);
    res.json({
      status: 201,
      message: err.message,
      data: null,
    });
  }
});

router.post("/get_product_result", async (req, res) => {
  const { result, company_id } = req.body;

  const arrTemp = [];
  const arrTempLevel = [];
  const arrTypeProduct_ID = [];
  const arrReturn = [];

  for (let i = 0; i < result.length; i++) {

    arrTemp.push(result[i].level)
    arrTempLevel.push(result[i].sdktype)
  }

  const typeProduct = await TypeProduct.find({ TypeSDK: { $in: arrTemp } });

  for (let i = 0; i < typeProduct.length; i++) {
    arrTypeProduct_ID.push(typeProduct[i]._id)
  }
  const data = await Item.find({
    companyid: company_id,
    type_product_id: { $in: arrTypeProduct_ID },
    sdktype: { $in: arrTempLevel }
  }, `name 
      title 
      name_level 
      image_link
      image
      description
      price
      linkdetail
      sdktype 
      type_sdk_id 
      brand_id 
      type_product_id 
      companyid`
  ).populate("type_product_id")

  let dataRes = lodash.reverse(data)

  var dataReturn = dataRes.reduce(function (r, a) {
    r[a.type_product_id.TypeSDK] = r[a.type_product_id.TypeSDK] || { title: a.type_product_id.Name, list_product: [] };
    r[a.type_product_id.TypeSDK].list_product.push(a);

    return r;
  }, Object.create(null));

  for (let i = 1; i <= 9; i++) {
    if (dataReturn["K" + i] != undefined) {
      var dataK = "K" + i
      //arrReturn[dataK] = dataReturn["K" + i]
      arrReturn.push({ ["K" + i]: dataReturn[dataK] })
    }
  }

  try {
    res.send(Response(200, "Success", arrReturn, true));
  } catch (err) {
    res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
  }
});

router.put("/:id", async (req, res) => {
  console.log(req.params.id)
  try {
    const item = await Item.findById(req.params.id);
    var name_level = ''

    if (req.body.sdktype == "1") {
      name_level = "Nhẹ"
    } else if (req.body.sdktype == "2") {
      name_level = "Trung"
    } else {
      name_level = "Cao"
    }


    (item.name = req.body.name !== undefined ? req.body.name : item.name),
      // (item.image = req.body.image !== undefined ? req.body.image : item.image),
      (item.image_link = req.body.image_link !== undefined ? req.body.image_link : item.image_link),
      (item.title = req.body.title !== undefined ? req.body.title : item.title),
      (item.price = req.body.price !== undefined ? req.body.price : item.price),
      (item.description =
        req.body.description !== undefined
          ? req.body.description
          : item.description),
      (item.linkdetail =
        req.body.linkdetail !== undefined
          ? req.body.linkdetail
          : item.linkdetail),
      (item.level = req.body.level !== undefined ? req.body.level : item.level),
      (item.sdktype = req.body.sdktype !== undefined ? req.body.sdktype : item.sdktype);
    (item.brand_id = req.body.brand_id !== undefined ? req.body.brand_id : item.brand_id);
    (item.name_level = name_level);
    item.companyid = req.body.companyid !== undefined ? req.body.companyid : item.companyid;

    const typeProduct = await TypeProduct.find();
    const typeSdk = await TypeSdk.findOne({ _id: ObjectId(req.body.type_sdk_id !== undefined ? req.body.type_sdk_id : item.type_sdk_id) });

    if (typeSdk.Name == "K1") {
      var type_product_id = typeProduct[0]._id
    } else if (typeSdk.Name == "K5") {
      var type_product_id = typeProduct[1]._id
    } else if (typeSdk.Name == "K6") {
      var type_product_id = typeProduct[2]._id
    } else if (typeSdk.Name == "K7") {
      var type_product_id = typeProduct[3]._id
    } else if (typeSdk.Name == "K8") {
      var type_product_id = typeProduct[4]._id
    } else if (typeSdk.Name == "K9") {
      var type_product_id = typeProduct[5]._id
    }

    item.type_product_id = type_product_id;
    item.type_sdk_id = req.body.type_sdk_id

    const a1 = await item.save();
    res.json(a1);
  } catch (err) {
    res.send("Error");
  }
});

router.post("/multiItem", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10000;
    let opts = {};
    if (req.body.data) {
      let queryData = [];
      req.body.data.forEach((element) =>
        queryData.push({
          $and: [{ level: element.level }, { sdktype: element.sdktype }],
        })
      );
      // console.log("queryData", queryData);
      opts["$or"] = queryData;
      // console.log("queryOption", opts["$or"]);
    }
    const data = await Item.find(opts)
      .limit(Number(limit))
      .skip(Number(page - 1) * Number(limit));

    const totalItems = await Item.countDocuments(opts);
    res.json({
      statusCode: 200,
      data,
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    });
  } catch (err) {
    console.log("err", err);
    res.json({
      status: 201,
      message: err.message,
      data: null,
    });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/image_plugin')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, file.originalname)
  }
})

//const upload = multer({ dest: 'public/', fieldSize: 300 * 1024 * 1024});
const upload = multer({ storage: storage });

router.post("/upload_image", upload.single('image'), function (req, res, next) {
  // console.log(res);

  // res.send("Ok")
  try {
  res.status(200).json("file uploaded successfully")
  } catch (error) {
  console.log(error.message);
  }
})


const storage_makeup = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/image_makeup')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, file.originalname)
  }
})

//const upload = multer({ dest: 'public/', fieldSize: 300 * 1024 * 1024});
const upload_makeup = multer({ storage: storage_makeup });

router.post("/upload_image_makeup", upload_makeup.single('image'), function (req, res, next) {
  console.log(req.file)
  res.send("Ok")
})

const storage_brand = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/image_brand')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, file.originalname)
  }
})

const storage_procduct = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/image_plugin')
  },
  filename: (req, file, cb) => {

    cb(null, file.originalname)
  }
})

//const upload = multer({ dest: 'public/', fieldSize: 300 * 1024 * 1024});
const upload_brand = multer({ storage: storage_brand });

router.post("/upload_image_brand", upload_brand.single('image'), async (req, res, next) => {
  console.log(req.file)
  res.send("Ok")
})



const upload_brand2 = multer({ storage: storage_procduct });

router.post("/upload_image_brand2", upload_brand2.single('image'), async (req, res, next) => {
  console.log(req.file)
  res.send("Ok")
})

module.exports = router;
