const ObjectId = require('mongodb').ObjectId
const Campaign = require('../models/PluginCollection/BeautyGame')
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
         
           
            if(resultCompany==null)
            {
                resultCompany = {
                    scoreMax: 1000,
                    score: 200,
                       
                };
                return  res.send(Response(200, "Lấy danh sách thành công", resultCompany, true, 0));
            }

         
            var filterSearch  = {"companyId": resultCompany._id };
            result = await Campaign.findOne(
                        filterSearch 
            );


          
            if(result==null)
            {
                result = {
                    scoreMax: 1000,
                    score: 200,
                       
                };
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

           
            var filterSearch  = {"companyId": company_id };
            result = await Campaign.findOne(
                        filterSearch 
            );
            if(result==null)
            {
                result = {
                    scoreMax: 1000,
                    score: 200,
                       
                };
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
                    scoreMax,
                    score,
                    status,
                    company_id,
                    
        } = req.body;
        

        var objUpdate = {
            scoreMax: scoreMax,
            score: score,
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
                        scoreMax,
                        score,
                        status,
                        id,
                        
            } = req.body;
            
    
            var objUpdate = {
                scoreMax: scoreMax,
                score: score,
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
        conditionWhere["score"] = {
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