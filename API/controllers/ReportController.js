

const axios = require('axios');
const Response = require('../helpers/Response')

const BannerMain  = require('../models/BannerMain');
const BannerSkin  = require('../models/BannerSkin');
const BannerSmall  = require('../models/BannerSmall');

const VendorBanner  = require('../models/VendorBanner');

const HistorySkinModel  = require('../models/PluginCollection/HistorySkinModel');
const CompanyPlugin  = require('../models/PluginCollection/CompanyPluginModel');
const ObjectID = require('mongodb').ObjectId;
module.exports = {

  getOverviewDashboard: async (req, res) => {
    const { page} = req.query;

    let skip = Number(page - 1) * Number(50);

     try {
          var data = null;
      
           var columnDisplay =  '';

           data = await HistorySkinModel.aggregate([  //Second stage
    
          {$group : {_id:"$Company_Id", count:{$sum:1}}},
          {$sort: {count:-1}},
          {$skip:skip},
         
          { $limit : 50 }
      
        
          ]);

    

        

          for await (const rating of data) {
        
            if(rating._id != null && rating._id != "")
            {
              const objectId1 = new ObjectID(rating._id.trim());
              rating.companyId = await CompanyPlugin.find({"_id":objectId1});

            } 
            if(rating._id == null)
            { 
              rating.companyId = [{
                Slug: "admin",
                Name : "admin",
                _id: rating._id
              }]
            }

            if(rating._id == '')
            { 
              rating.companyId = [{
                Slug: "admin1",
                Name : "admin1",
                 _id: rating._id
              }]
            }
           
        };
        
          var reponse = {
            "data": data,
           
          };
          res.send(Response(200, "Lấy danh sách thành công", reponse, true,0));
        
          

    } catch (err) {
      
        res.send(Response(202, JSON.stringify(err), err, false));
    }
},

}