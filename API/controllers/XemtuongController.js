const ObjectId = require('mongodb').ObjectId
const ModelDB = require('../models/ConfigModel')
const Response = require('../helpers/Response');
const ModelQuery = require('../models/ConfigColorModel');
const Gamebeauty = require('../models/PluginCollection/BeautyGame');
const CompanyPlugin = require('../models/PluginCollection/CompanyPluginModel');
const Xemtuong = require('../models/applamdep.com/Xemtuong');
const User = require('../models/EndUserModel')
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
           var columnDisplay =  'title title2  buttonText content  status image  ';
            filterSearch["slug"] = slugQuerry;
            result = await Xemtuong.findOne(filterSearch);


            
            if(result)
            {
               return  res.send(Response(200, "Thông tin thành công", result,true));
            }
           
         
            var itemInsert = await Xemtuong.create({
                title: "ĐĂNG KÝ XEM TƯỚNG ONLINE",
                title2: "GÓI CƠ BẢN LÀ 99.000 ĐỒNG",
                buttonText: "Đăng nhập/ Đăng ký",
                content : "Chúng tôi sẽ liên hệ trong vòng 24h kể từ khi bạn  đăng ký & thanh toán:",
                status:   "0",
                image: "https://applamdep.com/footerImage.jpg",
                slug: slugQuerry

            });

            return  res.send(Response(200, "Thông tin thành công", result,true));
         

        } catch (err) {
      
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },
    getAllCustomer: async (req, res) => {
        const {  company_id} = req.query;
        // const slugRequest = "xemtuong";
        //  var companyInfo = await CompanyPlugin.findOne({
        //     Slug: slugRequest
        // });
        var filterSearch = { isDelete: false };
        filterSearch["company_id"] = company_id;
        var dataUser = await User.find(filterSearch)
        .sort( { "_id": -1 } );
        return  res.send(Response(200, "Thông tin thành công", dataUser,true));
        
    },

    getallCompany: async (req, res) => {
        var dataXemtuong = await Xemtuong.find().populate("companyId");;
        return  res.send(Response(200, "Thông tin thành công", dataXemtuong,true));
        
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
           var columnDisplay =  'title1 title  buttonText content  status image';
           if(companyInfo)
            {
                filterSearch["slug"] = slug;
            }

            result = await Xemtuong.findOne(filterSearch);
            if(result)
            {
               return  res.send(Response(200, "Thông tin thành công", result,true));
            }
           
            
            var itemInsert = await Xemtuong.create({
                title: "ĐĂNG KÝ XEM TƯỚNG ONLINE",
                title2: "GÓI CƠ BẢN LÀ 99.000 ĐỒNG",
                buttonText: "Đăng nhập/ Đăng ký",
                content : "Chúng tôi sẽ liên hệ trong vòng 24h kể từ khi bạn  đăng ký & thanh toán:",
                status:   "0",
                image: "https://applamdep.com/footerImage.jpg",
                slug: slug
            });

            return  res.send(Response(200, "Thông tin thành công", result,true));
         

        } catch (err) {
      
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },


    addOrUpdate: async (req, res) => {
        try {
            const { company_id,title2 ,title,  buttonText, content , status, image } = req.body;
 
            var slugCompany = "-1";
            var idCompany = "-1";
            if(company_id != null && company_id !="" && company_id != "-1")
            {
                var companyInfo = await CompanyPlugin.findOne({
                    _id: ObjectId(company_id)
                });
                 slugCompany = companyInfo.Slug;
                 idCompany =companyInfo._id;

            }
            var filterSearch = {};

            if(companyInfo)
            {
                filterSearch["slug"] = slugCompany;
            }
             let result = await Xemtuong.findOne(filterSearch);
            if(result)
            {
                var objUpdate = {
                    title: title,
                    title2: title2,
                    buttonText: buttonText,
                    content : content,
                    status:  status,
                    image: image,
                    companyId: companyInfo._id,
                    slug: slugCompany
                  
                };
              
                await Xemtuong.updateOne({ _id: ObjectId(result._id) }, objUpdate);
            
            }
            else 
            {
                var itemInsert = await Xemtuong.create({
                            title: "ĐĂNG KÝ XEM TƯỚNG ONLINE",
                        title2: "GÓI CƠ BẢN LÀ 99.000 ĐỒNG",
                        buttonText: "Đăng nhập/ Đăng ký",
                        content : "Chúng tôi sẽ liên hệ trong vòng 24h kể từ khi bạn  đăng ký & thanh toán:",
                        status:   "0",
                        image: "https://applamdep.com/footerImage.jpg",
                        slug: slugCompany,
                        companyId: idCompany,
    
                });
            }
           
            res.send(Response(200, "Thao tác thành công", [], true));
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err), err, false));
        }
    }

    //
}