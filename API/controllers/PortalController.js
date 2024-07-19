
const ObjectId = require('mongodb')
const axios = require('axios');
const Response = require('../helpers/Response')

const BannerMain  = require('../models/BannerMain');
const BannerSkin  = require('../models/BannerSkin');
const BannerSmall  = require('../models/BannerSmall');

const VendorBanner  = require('../models/VendorBanner');
module.exports = {

  getAllBannerWeb: async (req, res) => {
    const { } = req.query;
     try {
          var resultMain = null;
          var resultBannerSmall = null;
          var resultBannerSkin =null;
          var resultVendorBanner =null;
          var filterSearch  = { isDelete: false};
           var columnDisplay =  '';
    
           resultMain = await BannerMain.find(
            filterSearch ,
            columnDisplay
          )     
          .sort({ 'create_date' : -1});

          resultBannerSmall = await BannerSmall.find(
            filterSearch ,
            columnDisplay
          )     
          .sort({ 'create_date' : -1});


          resultBannerSkin = await BannerSkin.find(
            filterSearch ,
            columnDisplay
          )     
          .sort({ 'countSkin' : 1});

          //resultVendorBanner


          resultVendorBanner = await VendorBanner.find(
            filterSearch ,
            columnDisplay
          )     
          .sort({ 'create_date' : -1});
        
          var reponse = {
            "bannermain": resultMain,
            "bannerSmall": resultBannerSmall,
            "bannerSkin": resultBannerSkin,
            "vendorBanner":resultVendorBanner
          };
          res.send(Response(200, "Lấy danh sách thành công", reponse, true,0));

    } catch (err) {
        res.send(Response(202, JSON.stringify(err), err, false));
    }
},

getIP: async (req, res) => {
  const ip = req.clientIp;
  res.send(Response(200, ip, reponse, true,0));
  return ;
  const { } = req.query;
   try {
        var resultMain = null;
        var resultBannerSmall = null;
        var resultBannerSkin =null;
        var resultVendorBanner =null;
        var filterSearch  = { isDelete: false};
         var columnDisplay =  '';
  
         resultMain = await BannerMain.find(
          filterSearch ,
          columnDisplay
        )     
        .sort({ 'create_date' : -1});

        resultBannerSmall = await BannerSmall.find(
          filterSearch ,
          columnDisplay
        )     
        .sort({ 'create_date' : -1});


        resultBannerSkin = await BannerSkin.find(
          filterSearch ,
          columnDisplay
        )     
        .sort({ 'countSkin' : 1});

        //resultVendorBanner


        resultVendorBanner = await VendorBanner.find(
          filterSearch ,
          columnDisplay
        )     
        .sort({ 'create_date' : -1});
      
        var reponse = {
          "bannermain": resultMain,
          "bannerSmall": resultBannerSmall,
          "bannerSkin": resultBannerSkin,
          "vendorBanner":resultVendorBanner
        };
        res.send(Response(200, "Lấy danh sách thành công", reponse, true,0));

  } catch (err) {
      res.send(Response(202, JSON.stringify(err), err, false));
  }
}

}