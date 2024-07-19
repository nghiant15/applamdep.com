const ObjectId = require('mongodb').ObjectId
const Campaign = require('../models/PluginCollection/Tuvan')
const CompanyPluginModel = require('../models/PluginCollection/CompanyPluginModel')
const History = require('../models/PluginCollection/HistorySkinModel')
const Response = require('../helpers/Response');
const HistorySkin = require('../models/PluginCollection/HistorySkinModel');
module.exports = {
    

    getInfo2: async (req, res) => {
        const { slug } = req.query;
      
    
        try {
            var result = null;

          
           var  resultCompany = await CompanyPluginModel.findOne(
                { "Slug":  slug} 
            );
            var phoneSale ="";

           
            if(resultCompany)
             {
                    phoneSale = resultCompany.Phone;
                    var tuVan = await Campaign.findOne({
                        "companyId": resultCompany._id
                    });
        
                 
                    if(tuVan)
                    {
                        
                    }
                    else
                    {
                            
                            var objUpdate = {
                                messengerLink: "",
                                zaloLink: "https://zalo.me/"+phoneSale,
                                status: "",
                                companyId: resultCompany._id
                            };
                            await Campaign.create(objUpdate);
                 }
            }

         
            var filterSearch  = {"companyId": resultCompany._id };
            result = await Campaign.findOne(
                        filterSearch 
            );

            if(result)
            
            {
                if(result.zaloLink =="")
                {   
                    var objUpdate = {
                    
                        zaloLink: "https://zalo.me/"+phoneSale
            
                    };
                    result.zaloLink = objUpdate.zaloLink;
                    await Campaign.updateOne({ _id: ObjectId(filterSearch._id) }, objUpdate);
                }
           }


        
           return  res.send(Response(200, "Lấy danh sách thành công", result, true, 0));

        } catch (err) {
            console.log(err);
            return  res.send(Response(202, JSON.stringify(err), err, false));
        }
    },
    getInfo: async (req, res) => {
        const { company_id } = req.query;
        try {
            var result = null;
            var  resultCompany = await CompanyPluginModel.findOne(
                { "_id":  ObjectId(company_id)} 
            );
        
            var  phoneSale = resultCompany.Phone;
            
            var filterSearch  = {"companyId": company_id };
            result = await Campaign.findOne(
                        filterSearch 
            );
        
            if(result==null)
            {
               
                var objUpdate = {
                    messengerLink: "",
                    zaloLink: "https://zalo.me/"+phoneSale,
                    status: "",
                    companyId: resultCompany._id
                };
                await Campaign.create(objUpdate);

                result = objUpdate;

            }
            else 
            {

                if(result.zaloLink =="")
                {   
                    var objUpdate = {
                    
                        zaloLink: "https://zalo.me/"+phoneSale
            
                    };
                    result.zaloLink = objUpdate.zaloLink;
                    await Campaign.updateOne({ _id: ObjectId(result._id) }, objUpdate);
                }
            }
            res.send(Response(200, "Lấy danh sách thành công", result, true, 0));

        } catch (err) {
            console.log(err);
             res.send(Response(202, JSON.stringify(err), err, false));
        }
    },
    AddorUpdate: async (req, res) => {
    try {
         const { 
                    messengerLink,
                    zaloLink,
                    status,
                    company_id,
                    
        } = req.body;
     

        var objUpdate = {
            messengerLink: messengerLink,
            zaloLink: zaloLink,
            status: status,
            companyId: company_id
        };

    
        var filterd  = {"companyId": company_id};
        var resultGame = await Campaign.findOne(filterd);
        if(resultGame)
            await Campaign.updateOne({ _id: ObjectId(resultGame._id) }, objUpdate);
        else
            await Campaign.create(objUpdate);
        res.send(Response(200, "Thao tác thành công", [], true));

    } catch (err) {

         res.send(Response(202, "Thao tác thất bại: " + JSON.stringify(err.keyValue), err, false));
    }
    },

    updateAdmin: async (req, res) => {
        try {
             const { 
                        messengerLink,
                        zaloLink,
                        status,
                        id,
                        
            } = req.body;
            
    
            var objUpdate = {
                messengerLink: messengerLink,
                zaloLink: zaloLink,
                status: status
            };
    
        
            await Campaign.updateOne({ _id: ObjectId(id) }, objUpdate);
            res.send(Response(200, "Thao tác thành công", [], true));
    
        } catch (err) {
    
             res.send(Response(202, "Thao tác thất bại: " + JSON.stringify(err.keyValue), err, false));
        }
        },
    getAll: async (req, res) => {
        const { companyId} = req.query;
         try {
            var result = null;
            var filterSearch  = { };
           
            if(companyId)
            {
                filterSearch  = {
                "companyId": companyId
                };
            }
            result = await Campaign.find(
            filterSearch 
            );

       
            if (result) {
                 let totalRecord = await Campaign.countDocuments(filterSearch);
            res.send(Response(200, "Lấy danh sách thành công", result, true, totalRecord));
            } else {
                 res.send(Response(202, "Lấy danh sách liên hệ thất bại", result, true,0));
            }

        } catch (err) {
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },

    getAllDataUser: async (req, res) => {
        try {
        const { phoneNumber , slug, company_id} = req.body;

        const page = req.body.page || 1;
        const limit = req.body.limit ||100;
        let conditionWhere = { isDelete: false };
            
        if(company_id != null &&  company_id != "" )
        {
            conditionWhere["Company_Id"] =company_id;
        }
     
        if(phoneNumber != null &&  phoneNumber != "" )
        {
            conditionWhere["Phone"] = phoneNumber;
        }
        conditionWhere["zaloLink"] = {
            $gt: 0
        };
        var columnDisplay =  '_id UserName User_Id Phone Name Email Address Create_Date Image ' ;
        var result = await HistorySkin.find(conditionWhere,columnDisplay)
        .sort({_id: -1})
        .limit(Number(limit))
        .skip(Number(page - 1) * Number(limit));
        const total = await HistorySkin.countDocuments({ isDelete: false, Company_Id: req.company_id }).lean()
        if (result) {
            res.send(Response(200, "Lấy danh sách lịch sử soi da thành công", { data: result, total: total }, true));
        } else {
            res.send(Response(202, "Lấy danh sách lịch sử soi da thất bại", result, true));
        }

        } catch (err) {
           
            res.send(Response(202, err.keyValue, err, false));
        }
    },
}