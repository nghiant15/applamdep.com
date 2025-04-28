const ObjectId = require('mongodb').ObjectId
const ModelDB = require('../models/ConfigModel')
const Response = require('../helpers/Response');
const ModelQuery = require('../models/ConfigColorModel');
const Gamebeauty = require('../models/PluginCollection/BeautyGame');
const CompanyPlugin = require('../models/PluginCollection/CompanyPluginModel');
const Minisize = require('../models/PluginCollection/SettingPluginModel');
module.exports = {
    getInfoPupup: async (req, res) => {
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
           var columnDisplay =  'showOrHide';
          
            filterSearch["slug"] = slugQuerry;
            result = await Minisize.findOne(filterSearch);

         
            
            if(result)
            {
               return  res.send(Response(200, "Thông tin thành công", result,true));
            }
           
            
            var itemInsert = await Minisize.create({
                showOrHide : "1",
                slug :  slugQuerry

            });

        

            return  res.send(Response(200, "Thông tin thành công", itemInsert,true));
         

        } catch (err) {
      
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },

   

    addOrUpdate: async (req, res) => {
        try {
            const { company_id,showOrHide} = req.body;
       
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
             let result = await Minisize.findOne(filterSearch);
            if(result)
            {
                var objUpdate = {
                  
                    showOrHide: showOrHide
                };

                console.log(objUpdate);
              
                await Minisize.updateOne({ _id: ObjectId(result._id) }, objUpdate);
            
            }
            else 
            {
                var itemInsert = await Minisize.create({
                    showOrHide: showOrHide,
                    slug: slugCompany
    
                });
            }
           
            res.send(Response(200, "Thao tác thành công", [], true));
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err), err, false));
        }
    }

    //
}