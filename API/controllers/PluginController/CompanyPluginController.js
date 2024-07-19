const ObjectId = require('mongodb').ObjectId
const Company = require('../../models/PluginCollection/CompanyPluginModel')
const Role = require('../../models/PluginCollection/RolePluginModel')
const Brand = require('../../models/MakeUpCollection/brand')
const UserPlugin = require('../../models/PluginCollection/UserPluginModel')
const subType = require('../../models/MakeUpCollection/subType')
const Sku = require('../../models/MakeUpCollection/product')
const Color = require('../../models/MakeUpCollection/color')
const Item = require('../../models/MakeUpCollection/item')
const Package = require('../../models/PluginCollection/PackageProductModel')
const PluginOrder = require('../../models/PluginCollection/PluginSaveOrderModel')
const FeatureModel = require('../../models/PluginCollection/FeatureModel')
const User = require('../../models/PluginCollection/UserPluginModel')
const Response = require('../../helpers/Response');
const calTime = require('../../helpers/calTime');
const md5 = require('md5');
const mongoose = require("mongoose")

var validator = require("email-validator");

async function transaction(company_id, us_id) {
    await Company.deleteOne({ _id: ObjectId(company_id) });
    await User.deleteOne({ _id: ObjectId(us_id) });
    await PluginOrder.deleteMany({ Company_Id: company_id });
}

module.exports = {

    getListCompany: async (req, res) => {
        try {
             const { limit, page1, indexPage } = req.body;
             
            const page = indexPage || 1;
            const limit1 = limit || 20;
            const skip = page * limit1;
        
             let totalCount =  await Company.countDocuments({isDelete: false});
             var dataCompany = await Company
             .aggregate
             ([
                {
                    $match:{"isDelete" : false}
                },
                { "$addFields": { "companyId": { "$toString": "$_id" }}},
                    {
                    $lookup: {
                            from: 'PluginOrder' ,
                            localField: 'companyId',
                            foreignField: 'Company_Id',
                            as: 'PluginOrder'
                    }
                     },

                      {
                        $sort:{"_id" : -1}
                    },
                    { 
                        $skip: skip
                    },
                    {
                        $limit: limit 
                    }
                    
        
        
            ]);
              let dataReturn  =  {
                total: totalCount,
                dataCompany: dataCompany 
            };

           
            return  res.send(Response(200, "Success", dataReturn, true));
            

        } catch (err) {

            console.log(err);
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    getAllCommpany: async (req, res) => {
        try {
             const { limit, page1, indexPage } = req.body;
             
            const page = indexPage || 1;
            const limit1 = limit || 20;
            const skip = page * limit1;
            var dataCompany = await Company.find().sort({_id: -1})
            let dataReturn  =  {
                total: 0,
                dataCompany: dataCompany 
            };
             return  res.send(Response(200, "Success", dataReturn, true));
        } catch (err) {

            console.log(err);
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    getListCompanyByID: async (req, res) => {
        try {
            var dataCompany = await Company.find({ isDelete: false, Create_By: req.user._id }).populate("Create_By");

            if (dataCompany) {
                var dataUser = await User.find({ isDelete: false }, `Company_Id UserName`)
                let arrUser = [];

                dataCompany.map(val => {
                    let users = dataUser.filter(v => String(v.Company_Id) == String(val._id));
                    if (users.length > 0) {
                        arrUser.push(Object.assign(val, { UserName: users[0].UserName }));
                    } else {
                        arrUser.push(Object.assign(val, { UserName: "" }));
                    }
                })
                res.send(Response(200, "Lấy dữ liệu thành công", arrUser, true));

            } else {
                res.send(Response(200, "Lấy dữ liệu thất bại", [], true));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    getNameCompany: async (req, res) => {
        try {
            const { company_id } = req.body;
            var result = await Company.findOne({ _id: company_id, isDelete: false });
            if (result) {
                res.send(Response(200, "Success", result, true));
            } else {
                res.send(Response(200, "Fail", result, false));
            }
        } catch (err) {
            res.send(Response(202, "Đã xảy ra lỗi ở: " + JSON.stringify(err.keyValue), err, false));
        }


    },

    getNameCompany: async (req, res) => {
        try {
            const { company_id } = req.body;
            var result = await Company.findOne({ _id: company_id, isDelete: false });
            if (result) {
                res.send(Response(200, "Success", result, true));
            } else {
                res.send(Response(200, "Fail", result, false));
            }
        } catch (err) {
            res.send(Response(202, "Đã xảy ra lỗi ở: " + JSON.stringify(err.keyValue), err, false));
        }


    },
    
    addCompany: async (req, res) => {
        try {
            const { UserName, Email, Phone, Slug, Sale_Code, Password, Type, Name } = req.body;

            let countUserName = await User.find({ UserName: UserName });
            let countPhone = await Company.find({ Phone: Phone });
            let countSlug = await Company.find({ Slug: Slug });

            if (countUserName.length > 0) {
                res.send(Response(202, `Tên đăng nhập (${UserName}) đã tồn tại trong cơ sở dữ liệu !!!`, [], false));
            } else if (countPhone.length > 0) {
                res.send(Response(202, `Số điện thoại (${Phone}) đã tồn tại trong cơ sở dữ liệu !!!`, [], false));
            } else if (countSlug.length > 0) {
                res.send(Response(202, `Tên thương hiệu (${Slug}) đã tồn tại trong cơ sở dữ liệu !!!`, [], false));
            } else {

                var role = await Role.findOne({ isDelete: false, Type: "2" });
                if (role) {
                    const result = await Company.create({
                        "Name": Name,
                        "Email": Email,
                        "Phone": Phone,
                        "Slug": Slug,
                        "Type": Type,
                        "Status": "Actived"
                    });

                    let getAdminRole = await Role.findOne({ Type: '0' });
                    var getAdminAcc = await User.findOne({ Role_Id: getAdminRole._id });
                    let resSaleCode = await User.find({ Phone: Sale_Code, isSale: true });

                    if (result) {
                        var company_id = result._id;

                        var res_user = await User.create({
                            "Name": Name,
                            "Email": Email,
                            "Phone": Phone,
                            "Sale_Id": resSaleCode.length == 0 ? getAdminAcc._id : resSaleCode[0]._id,
                            "Company_Id": company_id,
                            "Role_Id": role._id,
                            "UserName": UserName,
                            "Password": md5(Password),
                            "Code": company_id,
                            "isSale": false,
                            "Status": "Actived"
                        });
                        var us_id = res_user._id;

                        if (res_user) {

                            var resultBrand = await Brand.find().or([{ company_id: undefined }, { company_id: "1" }, { company_id: null }, { company_id: '' }]);
                            let arrBrand = [];
                            for (let i = 0; i < resultBrand.length; i++) {
                                let res = resultBrand[i];
                                arrBrand.push({ name: res.name, image: res.image, company_id: company_id, link: res.link })
                            }

                            let resBrand = await Brand.insertMany(arrBrand)

                            //
                            var resultSubType = await subType.find().or([{ company_id: undefined }, { company_id: 1 }, { company_id: null }, { company_id: '' }]);
                            let tempSubType = [];
                            for (let i = 0; i < resultSubType.length; i++) {
                                let res = resultSubType[i];
                                tempSubType.push({
                                    name: res.name,
                                    image: res.image,
                                    vi: res.vi,
                                    company_id: company_id,
                                    type_id: res.type_id,
                                    sub_type: res.sub_type,
                                    color_id: res.color_id,
                                    isNull: res.isNull
                                })
                            }

                            let resSubType = await subType.insertMany(tempSubType)


                            var resultSku = await Sku.find().or([{ company_id: undefined }, { company_id: 1 }, { company_id: null }, { company_id: '' }]);
                            let tempSku = [];
                            for (let i = 0; i < resultSku.length; i++) {
                                let res = resultSku[i];
                                tempSku.push({
                                    name: res.name,
                                    image: res.image,
                                    type_id: res.type_id,
                                    company_id: company_id,
                                    brand_id: res.brand_id,
                                    href: res.href,
                                    color_id: res.color_id
                                })
                            }

                            let resSku = await Sku.insertMany(tempSku)

                            var resultColor = await Color.find().or([{ company_id: undefined }, { company_id: 1 }, { company_id: null }, { company_id: '' }]);
                            let tempColor = [];
                            for (let i = 0; i < resultColor.length; i++) {
                                let res = resultColor[i];
                                tempColor.push({
                                    hex: res.hex,
                                    makeup_id: res.makeup_id,
                                    product_id:
                                        res.product_id,
                                    company_id: company_id,
                                    alpha: res.alpha,
                                    ver: res.ver
                                })
                            }

                            let resColor = await Color.insertMany(tempColor)

                            var resultItem = await Item.find().or([{ companyid: undefined }, { companyid: 1 }, { companyid: null }, { companyid: '' }]);
                            let tempItem = [];
                            for (let i = 0; i < resultItem.length; i++) {
                                let res = resultItem[i];
                                tempItem.push({
                                    companyid: company_id,
                                    name: res.name,
                                    image: res.image,
                                    title: res.title,
                                    linkdetail: res.linkdetail,
                                    level: res.level,
                                    sdktype: res.sdktype,
                                    type_product_id: res.type_product_id,
                                    type_sdk_id: res.type_sdk_id
                                })
                            }

                            let resItem = await Item.insertMany(tempItem)

                            if (resBrand && resSubType && resItem && resSku && resColor) {
                                let resPackage = await Package.find({ isDelete: false });
                                let arrPakage = [];
                                for (let i = 0; i < resPackage.length; i++) {
                                    arrPakage.push({
                                        "Company_Id": company_id,
                                        "Package_Id": resPackage[i]._id,
                                        "Sale_Id": resSaleCode.length == 0 ? getAdminAcc._id : resSaleCode[0]._id,
                                        "Array_Feature": resPackage[i].Array_Feature,
                                        "Active_Date": Date.now(),
                                        "End_Date": calTime(resPackage[i].Unit, resPackage[i].Value),
                                        "Status": "1"
                                    })
                                }

                                let addOrder = await PluginOrder.insertMany(arrPakage);

                                if (!addOrder) {
                                    transaction(company_id, us_id)
                                    res.send(Response(202, "Đã xảy ra lỗi trong quá trình thêm gói tính năng !!!", [], false));
                                }
                            } else {
                                transaction(company_id, us_id)
                                res.send(Response(202, "Đã xảy ra lỗi trong quá trình copy dữ liệu !!!", [], false));
                            }
                        }

                        if (res_user.Sale_Id == '') {
                            let resData = await User.findOne({ _id: ObjectId(res_user._id) });

                            let feature = await FeatureModel.find({ Type: "1" });

                            res.send(Response(200, "Hoàn tất tạo tài khoản cho khách hàng !!!", { data: resData, feature: feature }, true));
                        } else {
                            let resData = await User.findOne({ _id: ObjectId(res_user._id) }).populate("Sale_Id", "Discount");

                            let feature = await FeatureModel.find({ Type: "1" });

                            res.send(Response(200, "Hoàn tất tạo tài khoản cho khách hàng !!!", { data: resData, feature: feature }, true));
                        }

                    } else {
                        transaction(company_id, us_id)
                        res.send(Response(202, "Có lỗi đã xảy ra !!!", [], false));
                    }

                } else {
                    transaction(company_id, us_id)
                    res.send(Response(202, "Kiểm tra lại bảng phân quyền vì không có quyền nào là COMPANY", [], false));
                }

            }
        } catch (err) {
            transaction(company_id, us_id)
            res.send(Response(202, "Dữ liệu đã tồn tại trong cơ sở dữ liệu !!! Cụ thể " + JSON.stringify(err.keyValue) + " ", err, false));
        }
    },

    addCompanyForWebApp: async (req, res) => {
        try {
            const { UserName, Email, Phone, Slug, Sale_Code, Password, Type, Name, saleId, packageId } = req.body;
            let countUserName = await User.find({ UserName: UserName });
            let countPhone = await Company.find({ Phone: Phone });
            let countSlug = await Company.find({ Slug: Slug });

            var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

            var accentArray = ["á", "à", "ã", "â", "é", "è", "ê", "í", "ì", "î", "õ", "ó", "ò", "ô", "ú", "ù", "û"]

            for (var i = 0; i < UserName.length; i++) {
                for (var j = 0; j < accentArray.length; j++) {
                    if (UserName[i].toUpperCase() == accentArray[j].toUpperCase()) {
                        res.send(Response(202, `Tên đăng nhập phải được viết liền không dấu !!!`, [], false));
                        return
                    }
                }
            }
            if (format.test(UserName) == true) {
                res.send(Response(202, `Tên đăng nhập không được chứa khoảng trống hoặc kí tự đặc biệt !!!`, [], false));
            } else if (countUserName.length > 0) {
                res.send(Response(202, `Tên đăng nhập (${UserName}) đã tồn tại trong cơ sở dữ liệu !!!`, [], false));
            } else if (countPhone.length > 0) {
                res.send(Response(202, `Số điện thoại (${Phone}) đã tồn tại trong cơ sở dữ liệu !!!`, [], false));
            }else {

         
                var role = await Role.findOne({ isDelete: false, Type: "2" });
                if (role) {
                  

                    let getAdminRole = await Role.findOne({ Type: '0' });
                    var getAdminAcc = await User.findOne({ Role_Id: getAdminRole._id });
                    let resSaleCode =null;
                    if(saleId)
                    {
                        resSaleCode = await User.find({ _id: ObjectId(saleId), isSale: true });
            
                    }
                    
                    else 
                    {
                         resSaleCode = await User.find({ Phone: Sale_Code, isSale: true });
                    }
                    const result = await Company.create({
                        "Name": UserName,
                        "Email": Email,
                        "Phone": Phone,
                        "Sale_Id": saleId,
                        "Slug": UserName,
                        "Type": Type,
                        "Status": "Actived"
                    });
                    
                    if (result) {
                        var company_id = result._id;

                        var res_user = await User.create({
                            "Name": UserName,
                            "Email": Email,
                            "Phone": Phone,
                            "Sale_Id": resSaleCode.length == 0 ? getAdminAcc._id : resSaleCode[0]._id,
                            "Company_Id": company_id,
                            "Role_Id": role._id,
                            "UserName": UserName,
                            "Password": md5(Password),
                            "Code": company_id,
                            "isSale": false,
                            "Status": "Actived"
                        });
                        var us_id = res_user._id;
                         if (res_user) {
                            var resultSubType = await subType.find().or([{ company_id: undefined }, { company_id: 1 }, { company_id: null }, { company_id: '' }]);
                            let tempSubType = [];
                            for (let i = 0; i < resultSubType.length; i++) {
                                let res = resultSubType[i];
                                tempSubType.push({
                                    name: res.name,
                                    image: res.image,
                                    vi: res.vi,
                                    company_id: company_id,
                                    type_id: res.type_id,
                                    sub_type: res.sub_type,
                                    color_id: res.color_id,
                                    isNull: res.isNull
                                })
                            }

                            let resSubType = await subType.insertMany(tempSubType)

                            var resultColor = await Color.find().or([{ company_id: undefined }, { company_id: 1 }, { company_id: null }, { company_id: '' }]);
                            let tempColor = [];
                            for (let i = 0; i < resultColor.length; i++) {
                                let res = resultColor[i];
                                tempColor.push({
                                    hex: res.hex,
                                    makeup_id: res.makeup_id,
                                    product_id:
                                        res.product_id,
                                    company_id: company_id,
                                    alpha: res.alpha
                                })
                            }

                            let resColor = await Color.insertMany(tempColor)


                            if (resSubType && resColor) {
                                let resPackage = await Package.find({ isDelete: false });

                                if(packageId)
                                {
                                    resPackage = await Package.find({ Value: packageId});
                         
                                }
                                
                                else 
                                {
                                    resPackage =  await Package.find({ isDelete: false });
                                }
                                let arrPakage = [];


                                for (let i = 0; i < resPackage.length; i++) {
                                    arrPakage.push({
                                        "Company_Id": company_id,
                                        "Package_Id": resPackage[i]._id,
                                        "Sale_Id": resSaleCode.length == 0 ? getAdminAcc._id : resSaleCode[0]._id,
                                        "Array_Feature": resPackage[i].Array_Feature,
                                        "Active_Date": Date.now(),
                                        "End_Date": calTime(resPackage[i].Unit, resPackage[i].Value),
                                        "Status": "1"
                                    })
                                }
                              

                                let addOrder = await PluginOrder.insertMany(arrPakage);

                                if (!addOrder) {
                                    transaction(company_id, us_id)
                                    res.send(Response(202, "Đã xảy ra lỗi trong quá trình thêm gói tính năng !!!", [], false));
                                }
                            } else {
                                transaction(company_id, us_id)
                                res.send(Response(202, "Đã xảy ra lỗi trong quá trình copy dữ liệu !!!", [], false));
                            }
                        }

                        if (res_user.Sale_Id == '') {
                            let resData = await User.findOne({ _id: ObjectId(res_user._id) });

                            let feature = await FeatureModel.find({ Type: "1" });

                            res.send(Response(200, "Hoàn tất tạo tài khoản cho khách hàng !!!", { data: resData, feature: feature }, true));
                        } else {
                            let resData = await User.findOne({ _id: ObjectId(res_user._id) }).populate("Sale_Id", "Discount");

                            let feature = await FeatureModel.find({ Type: "1" });

                            res.send(Response(200, "Hoàn tất tạo tài khoản cho khách hàng !!!", { data: resData, feature: feature }, true));
                        }

                    } else {
                        transaction(company_id, us_id)
                        res.send(Response(202, "Có lỗi đã xảy ra !!!", [], false));
                    }

                } else {
                    transaction(company_id, us_id)
                    res.send(Response(202, "Kiểm tra lại bảng phân quyền vì không có quyền nào là COMPANY", [], false));
                }

            }
        } catch (err) {

            transaction(company_id, us_id)
            res.send(Response(202, "Dữ liệu đã tồn tại trong cơ sở dữ liệu !!! Cụ thể " + JSON.stringify(err.keyValue) + " ", err, false));
        }

    },

    updateCompany: async (req, res) => {
        try {
            const { Name, Email, Phone, Fax, Address, Slug, Website, Code, Status, UserName, id } = req.body;
            var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

            if (format.test(Slug) == true) {
                res.send(Response(202, `Định danh không được chứa khoảng trống hoặc kí tự đặc biệt !!!`, [], false));
            }

            const objUpdate = {
                "Name": Name,
                "Email": Email,
                "Phone": Phone,
                "Fax": Fax,
                "Address": Address,
                "Slug": Slug,
                "Website": Website,
                "Code": Code,
                "Status": Status
            };

            let result = await Company.updateOne({ _id: ObjectId(id) }, objUpdate);
            await UserPlugin.updateOne({ Company_Id: id }, { UserName: UserName });
            if (result) {
                res.send(Response(200, "Cập nhật thành công !!!", [], true));
            } else {
                res.send(Response(202, "Cập nhật thất bại !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    updateSlug: async (req, res) => {
        try {
            let body = req.body;
            var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

            if (format.test(body.Slug) == true) {
                res.send(Response(202, `Định danh không được chứa khoảng trống hoặc kí tự đặc biệt !!!`, [], false));
            }

            const objUpdate = {
                "Slug": body.Slug
            };

            let result = await Company.updateOne({ _id: ObjectId(body.id) }, objUpdate);

            if (result) {
                res.send(Response(200, "Success", [], true));
            } else {
                res.send(Response(202, "Fail", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    deleteCompany: async (req, res) => {
        try {
            let body = req.body;
            const objDelete = {
                "isDelete": true
            };
            let result = await Company.updateOne({ _id: ObjectId(body.id) }, objDelete);

            if (result) {
                res.send(Response(200, "Success", [], true));
            } else {
                res.send(Response(202, "Fail", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    countResSkin: async (req, res) => {
        try {
            let { slug } = req.body;
            let result = await Company.findOne({ Slug: slug });
            let resultAdmin = await Company.findOne({ company_id: null });

            if (slug == null || slug == "" || slug == undefined) {
                if (resultAdmin) {
                    let resultRes = await Company.findOneAndUpdate({ _id: resultAdmin._id }, { Res_makeup: Number(resultAdmin.Res_makeup) + 1 });
                    if (resultRes) {
                        res.send(Response(200, "Thêm view thành công", [], true));
                    } else {
                        res.send(Response(202, "Thêm view thất bại", [], false));
                    }
                } else {
                    res.send(Response(202, "Tên thường hiệu không tồn tại !!!", [], false));
                }
            } else {
                if (result) {
                    let resultRes = await Company.findOneAndUpdate({ _id: result._id }, { Res_skin: Number(result.Res_skin) + 1 });
                    if (resultRes) {
                        res.send(Response(200, "Thêm view thành công", [], true));
                    } else {
                        res.send(Response(202, "Thêm view thất bại", [], false));
                    }
                } else {
                    res.send(Response(202, "Tên thường hiệu không tồn tại !!!", [], false));
                }
            }

        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    countResMakeUp: async (req, res) => {
        try {
            let { slug } = req.body;
            let result = await Company.findOne({ Slug: slug });
            let resultAdmin = await Company.findOne({ company_id: null });
            if (slug == null || slug == "" || slug == undefined) {
                if (resultAdmin) {
                    let resultRes = await Company.findOneAndUpdate({ _id: resultAdmin._id }, { Res_makeup: Number(resultAdmin.Res_makeup) + 1 });
                    if (resultRes) {
                        res.send(Response(200, "Thêm view thành công", [], true));
                    } else {
                        res.send(Response(202, "Thêm view thất bại", [], false));
                    }
                } else {
                    res.send(Response(202, "Tên thường hiệu không tồn tại !!!", [], false));
                }
            } else {
                if (result) {
                    let resultRes = await Company.findOneAndUpdate({ _id: result._id }, { Res_makeup: Number(result.Res_makeup) + 1 });
                    if (resultRes) {
                        res.send(Response(200, "Thêm view thành công", [], true));
                    } else {
                        res.send(Response(202, "Thêm view thất bại", [], false));
                    }
                } else {
                    res.send(Response(202, "Tên thường hiệu không tồn tại !!!", [], false));
                }
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },
   
}