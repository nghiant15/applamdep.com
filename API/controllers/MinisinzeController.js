const ObjectId = require('mongodb').ObjectId
const ModelDB = require('../models/ConfigModel')
const Response = require('../helpers/Response');
const ModelQuery = require('../models/ConfigColorModel');
const Gamebeauty = require('../models/PluginCollection/BeautyGame');
const CompanyPlugin = require('../models/PluginCollection/CompanyPluginModel');
const Minisize = require('../models/applamdep.com/Minisize');
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
           var columnDisplay =  'countDown showUp  title slch  minisize titleProduct priceText butonText imageLink linkRegister';
          
            filterSearch["slug"] = slugQuerry;
            result = await Minisize.findOne(filterSearch);

      
            
            if(result)
            {
               return  res.send(Response(200, "Thông tin thành công", result,true));
            }
           
            
            var itemInsert = await Minisize.create({
                title: "Nhận Miễn Phí Minisize Xịn",
                slch: "Số lượng có hạn",
                titleProduct: "la Roche-Posay Effaclar 50ml",
                priceText : "Giá niêm yết 210.000",
                butonText: "Đăng ký",
                countDown:   "3",
                showUp: "3",
                imageLink: "https://applamdep.com/bannerTuVan.png",
                linkRegister: "https://docs.google.com/forms/d/e/1FAIpQLSccgb1yrHC7tjSQkbeRfH3cnEV1w2Mm0s1cpu5Co34nQ5OC7A/viewform",
                slug: slugQuerry

            });

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
           var columnDisplay =  'countDown showUp title slch titleProduct priceText butonText imageLink linkRegister';
           if(companyInfo)
            {
                filterSearch["slug"] = slug;
            }

            result = await Minisize.findOne(filterSearch);
            if(result)
            {
               return  res.send(Response(200, "Thông tin thành công", result,true));
            }
           
            
            var itemInsert = await Minisize.create({
                title: "Nhận Miễn Phí Minisize Xịn",
                slch: "Số lượng có hạn",
                countDown: "3",
                showUp: "3",
                minisize: "https://applamdep.com/minisize.png",
                titleProduct: "la Roche-Posay Effaclar 50ml",
                priceText : "Giá niêm yết 210.000",
                butonText: "Đăng ký",
                imageLink: "https://applamdep.com/bannerTuVan.png",
                linkRegister: "https://docs.google.com/forms/d/e/1FAIpQLSccgb1yrHC7tjSQkbeRfH3cnEV1w2Mm0s1cpu5Co34nQ5OC7A/viewform",
                slug: slug

            });

            return  res.send(Response(200, "Thông tin thành công", result,true));
         

        } catch (err) {
      
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },


    addOrUpdate: async (req, res) => {
        try {
            const { countDown, showUp,company_id,minisize, title,slch,titleProduct,priceText,butonText, imageLink,linkRegister, slug } = req.body;
            console.log("showUp",showUp);
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
                    title: title,
                    slch: slch,
                    showUp: showUp,
                    countDown: countDown,
                    minisize: minisize,
                    titleProduct: titleProduct,
                    priceText : priceText,
                    butonText:butonText,
                    imageLink: imageLink,
                    linkRegister: linkRegister,
                  
                };
              
                await Minisize.updateOne({ _id: ObjectId(result._id) }, objUpdate);
            
            }
            else 
            {
                var itemInsert = await Minisize.create({
                    title: "Nhận Miễn Phí Minisize Xịn",
                    slch: "Số lượng có hạn",
                    countDown: "3",
                    showUp: "3",
                    titleProduct: "la Roche-Posay Effaclar 50ml",
                    priceText : "Giá niêm yết 210.000",
                    butonText: "Đăng ký",
                    imageLink: "https://applamdep.com/bannerTuVan.png",
                    linkRegister: "https://docs.google.com/forms/d/e/1FAIpQLSccgb1yrHC7tjSQkbeRfH3cnEV1w2Mm0s1cpu5Co34nQ5OC7A/viewform",
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