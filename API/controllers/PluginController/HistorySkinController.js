const ObjectId = require('mongodb').ObjectId
const HistorySkin = require('../../models/PluginCollection/HistorySkinModel')
const ConnectionClickType = require('../../models/PluginCollection/ConnectionClickType')

const CompanyPlugin = require('../../models/PluginCollection/CompanyPluginModel')
const UserPluginModel = require('../../models/PluginCollection/UserPluginModel')
const ViewPlugin = require('../../models/PluginCollection/ViewPluginModel')
const Response = require('../../helpers/Response');
const Customer = require('../../models/PluginCollection/CustomerModel');

const BeautyGame = require('../../models/PluginCollection/BeautyGame');
const EndUserModel = require('../../models/EndUserModel');
module.exports = {
    getHistorySkin: async (req, res) => {

    
        try {


            const page = req.body.page || 1;
            const limit = req.body.limit || 5;
            const phoneNumber = req.body.phoneNumber || null;
            const company_id = req.body.company_id || null;

            const fromDate = req.body.fromDate || null;
            const endDate = req.body.endDate || null;
            const keyText = req.body.keyText || null;
            const customerName = req.body.customerName || null;
             let fitersearch = { isDelete: false };

             

            if(fromDate && endDate )
            {

                   fitersearch["Create_Date"] = 
                    {
                        
                        $gte: fromDate,
                        $lte: endDate
                    };

            }
        
            // if(endDate)
            // {

            //        fitersearch["Create_Date"] = 
            //         {
                        
            //             $gte: fromDate
            //         };

            // }
        

             if(phoneNumber)
             {
                fitersearch["Phone"] = phoneNumber;
             }

             if(company_id)
             {
                fitersearch["Company_Id"] = company_id;
             }

             if(keyText)
             {

                fitersearch["Phone"] = keyText;
             }
             if(customerName)
             {

                fitersearch["Name"] = customerName;
             }

             
            
            var result = await HistorySkin.find(fitersearch)
            .limit(Number(limit))
            .skip(Number(page - 1) * Number(limit))
            .lean();
            const total = await HistorySkin.countDocuments(fitersearch).lean()
            var users = await UserPluginModel.find({ isDelete: false }).lean()
            var companys = await CompanyPlugin.find({ isDelete: false }).lean()

            let resultData = [];
            result.map(val => {
                let user = users.filter(v => v['_id'] == val['npmle_Id'])
                let company = companys.filter(v => v['_id'] == val['Company_Id'])
                resultData.push(Object.assign(val, { Sale_Id: user.length > 0 ? user[0].Name : null, Company_Id: company[0] }));
            })
            
            if (resultData) {
                
                res.send(Response(200, "Lấy danh sách lịch sử soi da thành công", { data: resultData, total: total }, true));
            } else {
                res.send(Response(202, "Lấy danh sách lịch sử soi da thất bại", [], true));
            }

        } catch (err) {
            res.send(Response(202, err.keyValue, err, false));
        }
    },

    getDetailHistory   : async (req, res) => {

    
        try {

            const company_id = req.body.company_id || null;
            const page = req.body.page || 1;
            const limit = req.body.limit || 100;
            const phoneNumber = req.body.phoneNumber || null;
            const keyText = req.body.keyText || null;
             let fitersearch = { isDelete: false };

             fitersearch["Create_Date"] = 
             {
                 $gte: new Date(2023, 6, 1)
             };
           

             if(phoneNumber)
             {
                fitersearch["Phone"] = phoneNumber;
             }

             if(company_id)
             {

                fitersearch["Company_Id"] = company_id;
             }

           
            var result = await HistorySkin.find(fitersearch)
            .limit(Number(limit))
            .skip(Number(page - 1) * Number(limit))
            .lean();
            const total = await HistorySkin.countDocuments(fitersearch).lean()
            var users = await UserPluginModel.find({ isDelete: false }).lean()
            var companys = await CompanyPlugin.find({ isDelete: false }).lean()

            let resultData = [];
            result.map(val => {
                let user = users.filter(v => v['_id'] == val['Sale_Id'])
                let company = companys.filter(v => v['_id'] == val['Company_Id'])
                resultData.push(Object.assign(val, { Sale_Id: user.length > 0 ? user[0].Name : null, Company_Id: company[0] }));
            })
            
            if (resultData) {
                
                res.send(Response(200, "Lấy danh sách lịch sử soi da thành công", { data: resultData, total: total }, true));
            } else {
                res.send(Response(202, "Lấy danh sách lịch sử soi da thất bại", [], true));
            }

        } catch (err) {
            res.send(Response(202, err.keyValue, err, false));
        }
    },
    exportHistorySkin: async (req, res) => {
        
        try {
            const company_id = req.body.company_id || null;
            const phoneNumber = req.body.phoneNumber || null;
            const customerName = req.body.customerName || null;
            const keyText = req.body.keyText || null;
             let fitersearch = { isDelete: false };
             const fromDate = req.body.fromDate || null;
             const endDate = req.body.endDate || null;
             if(fromDate && endDate )
            {
                   fitersearch["Create_Date"] = 
                    {
                        
                        $gte: fromDate,
                        $lte: endDate
                    };
            }
            
            if(company_id)
             {
                    fitersearch["Company_Id"] = company_id;
             }
             
             if(phoneNumber)
             {
                    fitersearch["Phone"] = phoneNumber;
             }
   
            var result = await HistorySkin.find(fitersearch)
            .select('regionName saleName connectionType timeConnection minisizeClick timeminisizeClick  ipClient companyName dataCheckRegion Create_Date successGame typeLogin gameType isDelete gameJoinType1 location score ageGame ageGameReal _id UserName User_Id Phone Image  Company_Id Sale_Id ')
            .limit(1000);
             if (result) {
                  res.send(Response(200, "Lấy danh sách lịch sử soi da thành công", { data: result, total: 0 }, true));
            } else {
                res.send(Response(202, "Lấy danh sách lịch sử soi da thất bại", [], true));
            }

        } catch (err) {
            res.send(Response(202, err.keyValue, err, false));
           console.log(err);
            return;
         
            
        }
    },
     

    getHistorySkinByPhone: async (req, res) => {
        try {
            
            const page = req.body.page || 1;
            const limit = req.body.limit || 50;
            const phone = req.body.phoneNumber;
        
            var result = await HistorySkin.find(
                { 
                  isDelete: false, 
                  Phone: phone,
                //   Company_Id: req.body.company_id
                })
           .limit(Number(limit))
            .skip(Number(page - 1) * Number(limit))
           .lean();
            const total = await HistorySkin.countDocuments({ 
                 isDelete: false, 
                  Phone: phone,
              }).lean()
           
            
            if (result) {
                
                res.send(Response(200, "Lấy danh sách lịch sử soi da thành công", { data: result, total: total }, true));
            } else {
                res.send(Response(202, "Lấy danh sách lịch sử soi da thất bại", [], true));
            }

        } catch (err) {
            res.send(Response(202, err.keyValue, err, false));
        }
    },
    getHistorySkinByIdByUser: async (req, res) => {
        try {
            let user = req.user;
       
            const page = req.body.page || 1;
            const limit = req.body.limit || 50;
        
            var result = await HistorySkin.find(
                { 
                  isDelete: false, 
                  User_Id:user._id,
                  Company_Id: req.body.company_id
                }, {
                    _id: 1,
                    Image :2,
                    Create_Date: 3
                  })
           .limit(Number(limit))
            .skip(Number(page - 1) * Number(limit))
           .lean();
            const total = await HistorySkin.countDocuments({ 
                isDelete: false, 
                User_Id:user._id,
                Company_Id: req.body.company_id
              }).lean()
           
            
            if (result) {
                
                res.send(Response(200, "Lấy danh sách lịch sử soi da thành công", { data: result, total: total }, true));
            } else {
                res.send(Response(202, "Lấy danh sách lịch sử soi da thất bại", [], true));
            }

        } catch (err) {
            res.send(Response(202, err.keyValue, err, false));
        }
    },
    getHistorySkin_byCondition: async (req, res) => {
        try {
            const page = req.body.page || 1;
            const customerName = req.body.customerName || null;
            const limit = req.body.limit || 10;
            const company_id  = req.body.company_id || null;
            const phoneNumber = req.body.phoneNumber || null;
             let fitersearch = { isDelete: false };

             if(company_id)
             {
                fitersearch["Company_Id"] = company_id;
             }

             if(customerName)
             {
                fitersearch["UserName"] = customerName;
             }
            

             fitersearch["Create_Date"] = 
             {
                 $gte: new Date(2023, 1, 1)
             };
              
             if(phoneNumber)
             {
                fitersearch["Phone"] = phoneNumber;
             }
            

            var result = await HistorySkin.find(fitersearch)
            .sort({_id: -1})
            .limit(Number(limit))
            .skip(Number(page - 1) * Number(limit))
            .populate("Company_Id", "Name").lean();

            const total = await HistorySkin.countDocuments(fitersearch).lean()
            if (result) {
                res.send(Response(200, "Lấy danh sách lịch sử soi da thành công", { data: result, total: total }, true));
            } else {
                res.send(Response(202, "Lấy danh sách lịch sử soi da thất bại", result, true));
            }

        } catch (err) {
            res.send(Response(202, err.keyValue, err, false));
        }
    },

    exportHistory: async (req, res) => {
        try {
            const page = req.body.page || 1;
            const customerName = req.body.customerName || null;
            const limit = req.body.limit || 10;
            const company_id  = req.body.company_id || null;
            const phoneNumber = req.body.phoneNumber || null;
             let fitersearch = { isDelete: false };

             if(company_id)
             {
                fitersearch["Company_Id"] = company_id;
             }

             if(customerName)
             {
                fitersearch["UserName"] = customerName;
             }
            

             fitersearch["Create_Date"] = 
             {
                 $gte: new Date(2023, 6, 1)
             };
              
             if(phoneNumber)
             {
                fitersearch["Phone"] = phoneNumber;
             }
            
            

            var result = await HistorySkin.find(fitersearch)
            .sort({_id: -1});
             
            console.log(fitersearch);

        
            if (result) {
                res.send(Response(200, "Lấy danh sách lịch sử soi da thành công", { data: result, total: 0 }, true));
            } else {
                res.send(Response(202, "Lấy danh sách lịch sử soi da thất bại", result, true));
            }

        } catch (err) {
            res.send(Response(202, err.keyValue, err, false));
        }
    },
    getAllHistory: async (req, res) => {
        try {
            const { phoneNumber , slug, company_id} = req.body;
            const page = req.body.page || 1;
            const limit = req.body.limit ||10;
            let conditionWhere = { isDelete: false };
           
            if(company_id != null &&  company_id != "" )
            {
                conditionWhere["Company_Id"] =company_id;
            }
     
            if(phoneNumber != null &&  phoneNumber != "" )
            {
                conditionWhere["Phone"] = phoneNumber;
            }
            conditionWhere["Create_Date"] = 
            {
                $gte: new Date(2023, 1, 1)
            };
            
     
            var columnDisplay =  '_id UserName User_Id Phone Name Email Address Create_Date  ' ;
            var result = await HistorySkin.find(conditionWhere,columnDisplay)
            .sort({_id: -1})
            .limit(Number(limit))
            .skip(Number(page - 1) * Number(limit));
            const total = await HistorySkin.countDocuments(conditionWhere);
           
            
            if (result) {
                res.send(Response(200, "Lấy danh sách lịch sử soi da thành công", { data: result, total: total }, true));
            }else{
                res.send(Response(202, "Lấy danh sách lịch sử soi da thất bại", result, true));
            }

        } catch (err) {
           
            res.send(Response(202, err.keyValue, err, false));
        }
    },
    addContionType:  async (req, res) => {
        try {
         let body = req.body;
         
         const {historyId, connectionType} = req.body;
         const result = await HistorySkin.findOne({
             "_id": ObjectId(historyId)
         });
         if (result) {


            let objUpdate = {
                "connectionType": connectionType,
                "timeConnection":  Date.now()
                
             };
             if(connectionType =="minisize")
             {
                objUpdate = {
                    "minisizeClick": connectionType,
                    "timeminisizeClick":  Date.now()
                    
                 };

             }
             let result1 = await HistorySkin.updateOne({ _id: ObjectId(historyId) }, objUpdate);
             res.send(Response(200, "Fail", [], true));
         } else {
             res.send(Response(200, "Fail", [], false));
         }
     } catch (err) {
        res.send(Response(202, "Fail", [], false));
     }
 },
 addContionType2:  async (req, res) => {
    try {
        let body = req.body;
        const {connectionType,location,Company_Id } = req.body;
        const objUpdate = {
        "connectionType": connectionType,
        "location": location,
        "Company_Id": Company_Id,
        "timeConnection":  Date.now()

        };
         await ConnectionClickType.create(objUpdate);
         res.send(Response(200, "message success", [], true));
 } catch (err) {
    console.log(err);
    res.send(Response(202, "Fail", [], false));
 }
},
    addHistorySkin: async (req, res) => {
           try {
            let body = req.body;
            
            const {location} = req.body;
            const result = await HistorySkin.create({
                "UserName": body.UserName,
                "Result": body.Result,
                "location": location,
                "User_Id": body.User_Id,
                "Company_Id": body.Company_Id,
                "Sale_Id": body.Sale_Id,
                "Create_Date": Date.now()
            });
            if (result) {
                var resCompany = await CompanyPlugin.findOne({ _id: body.Company_Id });
                if(resCompany) {
                    var resView = await ViewPlugin.findOne({ slug: resCompany.Slug });
                    if(resView) {
                        await ViewPlugin.updateOne({ _id: resView._id }, { view: Number(resView.view) + 1 })
                    } else {
                        await ViewPlugin.create({
                            "company_id": resCompany._id,
                            "slug": resCompany.Slug,
                            "view": "1"
                        })
                    }
                } else {
                    res.send(Response(202, "Không tồn tại công ty này", [], false));
                }
                
                res.send(Response(200, "Success", [], true));
            } else {
                res.send(Response(202, "Fail", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },
    addHistorySkin_Plugin:async (req, res) => {

        
        try {

                const {Company_Id,Result,typeLogin,successGame,
                    Sale_Id, ipClient,ipRequest, regionName, dataCheckRegion, UserName,Image,
                    ageGame, 
                    gamejoinType1,
                    gameType,
                    connectionType,
                    timeConnection,
                    ageGameReal, 
                    slug,Name} = req.body;
               
                let user = req.user;
                let nameInput = user.name;
                if(Name) 
                {
                    nameInput = Name;
                }

                const beautyGame = await BeautyGame.findOne({
                    "companyId":  Company_Id
                });
                let scoreMax = 0;
                let score =0;

                if(beautyGame)
                {
                    scoreMax =  beautyGame.BeautyGame;
                    score = beautyGame.score;
                }
                else 
                {
                    score = 200;
                    scoreMax = 1000;
                }
                
                if(beautyGame.status == "0")
                {

                    score =0;
                    scoreMax = 0;
                }
                else 
                {

                    const enduser = await EndUserModel.findOne({
                        company_id: Company_Id,
                        phone: user.phone
    
    
                    });
    
                    let scoreInput = score;
                    if(enduser)
                    { 
                        if(enduser.score)
                        {   
                            scoreInput = enduser.score *1 + score*1;
                        }
                        else 
                        {
    
                        }
                        const objUpdate = {
                            "score": scoreInput
                            
                         };
    
                         let result1 = await EndUserModel.updateOne({ _id: ObjectId(enduser._id) }, objUpdate);
    
                       
                    }
                    

                }
                
                
           
                const compnayCheck = await CompanyPlugin.findOne({ _id: ObjectId(Company_Id)});
             
                let saleName = '';
                let saleId2 = '';
                let saleType = "";
                let companyName ='';
                if(compnayCheck)
                {
                    companyName = compnayCheck.Name;
                    saleId2 = compnayCheck.Sale_Id;
                  
                    if(saleId2 != null && saleId2 !='')
                    { 
                        let saleCompany = await UserPluginModel.findOne({ _id: ObjectId(saleId2)});

                        if(saleCompany)
                        {
                            saleName = saleCompany.Name;
                            saleType = "3";
                        }
                     }
                
               }
                const result = await HistorySkin.create({
                    "saleName": saleName,
                    "saleId2": saleId2,
                 "companyName" :companyName,
                   "saleType": saleType,
                        "UserName": nameInput,
                        "regionName":regionName,
                        "dataCheckRegion": dataCheckRegion,
                        "Result": Result,
                        "gamejoinType1": gamejoinType1,
                        "ageGame": ageGame,
                        "score" :  score,
                        "ageGameReal": ageGameReal,
                        "Name": nameInput,
                        "Email": user.Email,
                        "Address": user.Address,
                        "User_Id": user._id,
                        "Phone": user.phone,
                        "Image":Image,
                        "gameType": gameType,
                        "ipClient": ipClient,
                        "ipRequest": ipRequest,
                        "Company_Id": Company_Id,
                      
                      
                        "Sale_Id": Sale_Id,
                        "slug" : slug, 
                        "successGame": successGame, 
                        "typeLogin": typeLogin, 
                        "Create_Date": Date.now()
                });

                if (result) {
                        $customer = await Customer.create({
                            "FullName": nameInput,
                            "UserName": user.username,
                            "Email": user.Email,
                            "Phone": user.phone,
                            "Address": user.Address,
                            "Company_Id":Company_Id
                        });
                        res.send(Response(200, "Thêm lịch sử soi da thành công !!!", result, true));
                } else {
                    res.send(Response(202, "Thêm lịch sử soi da thất bại !!!", [], false));
                }
        } catch (err) {
            console.log(err);
           
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    addHistorySkin_PluginNoUser:async (req, res) => {
        try {
            
            const { typeLogin, Company_Id,Result,
                ageGame, 
                    ageGameReal, 
                    gameJoinType1,
                    connectionType,
                    timeConnection,
                    gameType,
                Sale_Id,Image,ipClient, ipRequest,successGame, slug, regionName, dataCheckRegion } = req.body;

               
                const compnayCheck = await CompanyPlugin.findOne({ _id: ObjectId(Company_Id)});
             
                let saleName = '';
                let saleId2 = '';
                let saleType = "";
                let companyName ='';
                if(compnayCheck)
                {
                    companyName = compnayCheck.Name;
                    saleId2 = compnayCheck.Sale_Id;
                  
                    if(saleId2 != null && saleId2 !='')
                    { 
                        let saleCompany = await UserPluginModel.findOne({ _id: ObjectId(saleId2)});

                        if(saleCompany)
                        {
                            saleName = saleCompany.Name;
                            saleType = "3";
                        }
                     }
                
               }
            
             
               if(Result == null || Result == "")
               {
                   res.send(Response(202, "Fail", [], false));
               }
            
              const result = await HistorySkin.create({
                    "UserName":  'xx',
                    "saleName": saleName,
                    "saleId2": saleId2,
                   "saleType": saleType,
                   "companyName" :companyName,
                    "Result": Result,
                    "gameJoinType1": gameJoinType1,
                    "typeLogin": typeLogin,
                    "Name": 'xx',
                    "gameType": gameType,
                    "Email": "",
                    "Address": "",
                    "User_Id": null,
                    "Phone": "xxx",
                    "Image":Image,
                    "slug" : slug,
                    "ipClient": ipClient,
                    "regionName":regionName,
                    "dataCheckRegion": dataCheckRegion, 
                    "ipRequest": ipRequest,
                    "Company_Id": Company_Id,
                    "Sale_Id": Sale_Id,
                    "successGame": successGame,
                    "ageGame": ageGame,
                    "ageGameReal": ageGameReal,
                    "Create_Date": Date.now()
            });
          
            
            if (result) {
                    res.send(Response(200, "Thêm lịch sử soi da thành công !!!", result, true));
            } else {
                    res.send(Response(202, "Thêm lịch sử soi da thất bại !!!", [], false));
            }
        } catch (err) {
                res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },


    addHistorySkin_APP: async (req, res) => {
        try {
            
    
            const { Company_Id, Sale_Id, Result, UserName, User_Id, Phone, location } = req.body;
            const result = await HistorySkin.create({
                "UserName": UserName,
                "Result": Result,
                "User_Id": User_Id,
                "location": location,
                "Phone": Phone,
                "Company_Id": Company_Id,
                "Sale_Id": Sale_Id,
                "Create_Date": Date.now()
            });

            if (result) {
                res.send(Response(200, "Thêm lịch sử soi da thành công !!!", result, true));
            } else {
                res.send(Response(202, "Thêm lịch sử soi da thất bại !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    getHistorySkinById: async (req, res) => {
        try {
            const result = await HistorySkin.find({
                User_Id: req.user._id
            }).sort({_id: -1}).lean();

            let resultHistorySkin = [];
            result.map(val=>{
                resultHistorySkin.push(Object.assign(val, 
                { 
                    Create_Date: `${new Date(val.Create_Date).toLocaleDateString()} ${new Date(val.Create_Date).toLocaleTimeString()}`
                }));
            })

            if (result) {
                res.send(Response(200, "Lấy dữ liệu thành công !!!", resultHistorySkin, true));
            } else {
                res.send(Response(202, "Lấy dữ liệu thất bại !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Có lỗi đã xảy ra !!!", JSON.stringify(err), false));
        }
    },
    
    getHistoryById: async (req, res) => {
        try {
            const result = await HistorySkin.find({
                _id: req.body.idView
            });

            let resultHistorySkin = [];
            result.map(val=>{
                resultHistorySkin.push(Object.assign(val.toObject(),
                {
                    Result: JSON.parse(val.Result),
                    Create_Date: `${new Date(val.Create_Date).toLocaleDateString()} ${new Date(val.Create_Date).toLocaleTimeString()}`
                }));
            })

            if (result) {
                res.send(Response(200, "Lấy dữ liệu thành công !!!", resultHistorySkin[0], true));
            } else {
                res.send(Response(202, "Lấy dữ liệu thất bại !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Có lỗi đã xảy ra !!!", JSON.stringify(err), false));
        }
    },

    getDetailHistorySkin: async (req, res) => {
        try {
            const result = await HistorySkin.find({
                _id: req.body.id
            });

            let resultHistorySkin = [];
            result.map(val=>{
                resultHistorySkin.push(Object.assign(val.toObject(),
                {
                    Result: JSON.parse(val.Result),
                    Create_Date: `${new Date(val.Create_Date).toLocaleDateString()} ${new Date(val.Create_Date).toLocaleTimeString()}`
                }));
            })

            if (result) {
                res.send(Response(200, "Lấy dữ liệu thành công !!!", resultHistorySkin[0], true));
            } else {
                res.send(Response(202, "Lấy dữ liệu thất bại !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Có lỗi đã xảy ra !!!", JSON.stringify(err), false));
        }
    }

}