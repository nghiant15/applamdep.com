const ObjectId = require('mongodb').ObjectId
const BoookModel = require('../models/book/Book')
const History = require('../models/PluginCollection/HistorySkinModel')
const Response = require('../helpers/Response');
const multer = require('multer');
var slugify = require('slugify');
module.exports = {
    
    getAll: async (req, res) => {
        const { type,companyid, page } = req.query;
         try {
                
            var result = null;
            var filterSearch   = {};
            if( type )
            { 
                    filterSearch["categoryId"] = type;
            }

            if(companyid)
            { 

                filterSearch["companyid"] = "6514d919565d31321b2c5719";
            }
            var columnDisplay =  'code image  title2 author extraInfo slug linkFiePdf hrefLink dowload linkCover linkFiePdf categoryId des title status create_date ';
    
              result = await BoookModel.find(
                         filterSearch ,
                        columnDisplay
              )     
              .sort({ 'index' : -1});
              if (result) {
                 let totalRecord = await BoookModel.countDocuments(filterSearch);
                 res.send(Response(200, "Lấy danh sách thành công", result, true, totalRecord));
            } else {
                res.send(Response(202, "Lấy danh sách liên hệ thất bại", result, true,0));
            }

        } catch (err) {
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },

    getBookBySlug: async (req, res) => {
        const { slug, companyid } = req.query;
         try {
                
                var result = null;
                var filterSearch   = {};
                if( slug )
                { 
                        filterSearch["slug"] = slug;
                }

                if( companyid )
                { 
                        filterSearch["companyid"] = "6514d919565d31321b2c5719";
                }
                var columnDisplay =  'code image title2 author extraInfo slug linkFiePdf hrefLink dowload linkCover linkFiePdf categoryId des title status create_date ';
        
                result = await BoookModel.findOne(
                            filterSearch ,
                            columnDisplay
                )     
                .sort({ 'index' : -1});
                
                if(result)
                {
                    res.send(Response(200, "Lấy danh sách thành công", result, true, 1));
                } else {
                    res.send(Response(202, "Lấy danh sách liên hệ thất bại", result, true,0));
                }

        } catch (err) {
            console.log(err);
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },

    

      getAllFE: async (req, res) => {
        const { Type,companyid,code,  page } = req.query;

        function _formatString(str) {
            str = str.toLowerCase();
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            str = str.replace(/đ/g, "d");
            return str;
          }
        
     


         try {
                
            var result = null;
             var filterSearch   = {};
            if( Type )
            { 
                    filterSearch["categoryId"] = Type;
            }
            if( code)
            {
                let codeinput = _formatString(code);
                let sluginput = slugify(codeinput);
                filterSearch["$or"] =  [
                    { code: { $regex: codeinput  } },
                    { slug: { $regex: sluginput  } },
                    { title: { $regex: code  } }
                    ];
            }
            
         
            if(companyid)
            { 

                    filterSearch["companyid"] = "6514d919565d31321b2c5719";
            }
            var columnDisplay =  'code image title2 author extraInfo slug linkFiePdf hrefLink dowload linkCover linkFiePdf categoryId des title status create_date ';
    
              result = await BoookModel.find(
                    filterSearch ,
                    columnDisplay
              )     
              .sort({ 'create_date' : -1});
              if (result) {
                let totalRecord = await BoookModel.countDocuments(filterSearch);

 
                res.send(Response(200, "Lấy danh sách thành công", result, true, totalRecord));
            } else {
                res.send(Response(202, "Lấy danh sách liên hệ thất bại", result, true,0));
            }

        } catch (err) {
            console.log(err);
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },
    addBook: async (req, res) => {
            try {
                const { 
                  
                    companyid,
                    linkCover,
                    linkFiePdf,
                    title,
                    title2, 
                    author, 
                    extraInfo,
                    categoryId,
                   _id, 
                    status,
                    des
                } = req.body;

                slug = slugify(title);
                let hreflinkInput = "/"+slug;
                var objUpdate = {
                    hrefLink : hreflinkInput,
                    title: title,
                    slug: slug,
                    companyid: "6514d919565d31321b2c5719",
                    linkCover : linkCover ,
                    filepdf_link : "",
                    linkFiePdf : linkFiePdf,
                    categoryId : categoryId,
                    status: 1,
                    title2: title2, 
                    author: author, 
                    extraInfo: extraInfo,
                    des : des
                };
               
                var enttity = await BoookModel.findOne ({
                    slug: slug,
                    companyid: companyid
                });
                
                 if(enttity)
                 { 
               
                    await BoookModel.updateOne({ _id: enttity._id }, objUpdate);
                 }
                   
                else
                {   
                
                     await BoookModel.create(objUpdate);
                
                }
                res.send(Response(200, "Thao tác thành công", [], true));
                  
        
            } catch (err) {

              
                 res.send(Response(202, "Thao tác thất bại: " + JSON.stringify(err.keyValue), err, false));
            }
    },

   
      addBookTool: async (req, res) => {
            try {
                const { 
                  
                    companyid,
                    title,
                    title2,
                    author,
                    extraInfo, 
                    linkFilePdf, 
                    linkCover,
                    slug,
                    code,
                    categoryId
                   
                } = req.body;

             
                let hreflinkInput = "/book/"+slug;
                var objUpdate = {
                    hrefLink : hreflinkInput,
                    title: title,
                    slug: slug,
                    code: code,
                    companyid: "6514d919565d31321b2c5719",
                    linkCover : linkCover ,
                    filepdf_link : "",
                    linkFiePdf : linkFilePdf,
                    categoryId : categoryId,
                    status: 1,
                    title2: title2, 
                    author: author, 
                    extraInfo: extraInfo
                };


                // return    res.send(Response(200, "Thêm mới thành công", [], true));
                // var  bookItem = await BoookModel.findOne({slug: slug});

                // if(bookItem)
                // {
                //     await BoookModel.updateOne({ _id: bookItem._id }, objUpdate);
                //     console.log(slug);
                //     res.send(Response(200, "Cập nhật thành công", [], true));
                // }
                // else 
                // {
                  
                // }
                await BoookModel.create(objUpdate);
                res.send(Response(200, "Thêm mới thành công", [], true));
            
            } catch (err) {
                console.log(err);
                 res.send(Response(202, "Thao tác thất bại: " + JSON.stringify(err.keyValue), err, false));
            }
    },

    deleteAllBook: async (req, res) => {
        try {
        
            await BoookModel.find({}).remove().exec();
             res.send(Response(200, "Thao tác thành công", [], true));
              
    
        } catch (err) {
             res.send(Response(202, "Thao tác thất bại: " + JSON.stringify(err.keyValue), err, false));
        }
},
    deleteBook: async (req, res) => {
        try {
             const { 
               id
            } = req.body;
           
             if(id)
             { 
              
                 await BoookModel.deleteOne({ _id: ObjectId(id)});
             }
             res.send(Response(200, "Thao tác thành công", [], true));
              
    
        } catch (err) {
             res.send(Response(202, "Thao tác thất bại: " + JSON.stringify(err.keyValue), err, false));
        }
},
}