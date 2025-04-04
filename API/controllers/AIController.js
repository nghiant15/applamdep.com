const ObjectId = require('mongodb').ObjectId
const ModelDB = require('../models/ConfigModel')
const Response = require('../helpers/Response');
const ModelQuery = require('../models/ConfigColorModel');
const Gamebeauty = require('../models/PluginCollection/BeautyGame');
const CompanyPlugin = require('../models/PluginCollection/CompanyPluginModel');
const AIQuesttion = require('../models/applamdep.com/AIQuesttion');
module.exports = {

   
    getInfoAdmin: async (req, res) => {
        const {  company_id} = req.query;
      
        try {
          
            let slugQuerry =  "-1";
            if(company_id != null && company_id  != ""  &&  company_id  != "-1")
            {
                 var companyInfo = await CompanyPlugin.findOne({
                    _id: ObjectId(company_id)
                });
               
                if(companyInfo != null)
                {
                    slugQuerry = companyInfo.Slug;
                }
            }
          
            var result = null;
            var  filterSearch = {
            };
           var columnDisplay =  'question noted';
          
            filterSearch["slug"] = slugQuerry;
            result = await AIQuesttion.findOne(filterSearch);
            if(result)
            {
               return  res.send(Response(200, "Thông tin thành công", result,true));
            }

            else 

            {

                var itemInsert = await AIQuesttion.create({
                    question: "Kết luận tổng quan tình trạng da của người dùng",
                    noted: " hiển thị thông tin tổng quan, các vấn đề da nếu có, kết luận chung, lời khuyên, hiển thị dưới dạng mã html ( không đóng khung), bỏ qua mục không cần thiết hiển thị trên web",
                    slug: slugQuerry
    
                });
                result = await AIQuesttion.findOne(filterSearch);

            }
         

            return  res.send(Response(200, "Thông tin thành công", result,true));
         

        } catch (err) {
      
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },

    getInfo: async (req, res) => {
        const {  slug} = req.body;
        try {
            
            var result = null;
            var slugCompany = "-1";
            if(slug != null && slug !="")
            {
                slugCompany = slug;
            }
            var companyInfo = await CompanyPlugin.findOne({
                Slug: slug
            });
            var  filterSearch = {
            };
           var columnDisplay =  'question noted';
           if(companyInfo)
            {
                filterSearch["slug"] = slug;
            }

            result = await AIQuesttion.findOne(filterSearch);
            if(result)
            {
               return  res.send(Response(200, "Thông tin thành công", result,true));
            }
           
            
            var itemInsert = await AIQuesttion.create({
                question: "Kết luận tổng quan tình trạng da của người dùng",
                noted: " hiển thị thông tin tổng quan, các vấn đề da nếu có, kết luận chung, lời khuyên, hiển thị dưới dạng mã html ( không đóng khung), bỏ qua mục không cần thiết hiển thị trên web",
                slug: slug

            });

            return  res.send(Response(200, "Thông tin thành công", result,true));
         

        } catch (err) {
      
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },

 
    addOrUpdate: async (req, res) => {
        try {
            const { question,noted, company_id, slug } = req.body;
   
            var slugCompany = "-1";
            if(company_id != null && company_id !="" && company_id != "-1")
            {
                var companyInfo = await CompanyPlugin.findOne({
                    _id: ObjectId(company_id)
                });
                 slugCompany = companyInfo.Slug;
            }
            var filterSearch = {};

            if(companyInfo)
            {
                filterSearch["slug"] = slugCompany;
            }
             let result = await AIQuesttion.findOne(filterSearch);
            if(result)
            {
                var objUpdate = {
                    question: question,
                    noted: noted,
                  
                  
                };
              
                await AIQuesttion.updateOne({ _id: ObjectId(result._id) }, objUpdate);
            
            }
            else 
            {
                var itemInsert = await AIQuesttion.create({
                    question: "Kết luận tổng quan tình trạng da của người dùng",
                noted: " hiển thị thông tin tổng quan, các vấn đề da nếu có, kết luận chung, lời khuyên, hiển thị dưới dạng mã html ( không đóng khung), bỏ qua mục không cần thiết hiển thị trên web",
                    slug: slugCompany
    
                });
            }
           
            res.send(Response(200, "Thao tác thành công", [], true));
        } 
        catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err), err, false));
        }
    }

    //
}