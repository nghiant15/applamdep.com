const ObjectId = require('mongodb').ObjectId
const Campaign = require('..//models/Evoucher/BannerEmbedd')
const Response = require('../helpers/Response');
module.exports = {
    getAll: async (req, res) => {
        const {company_id, name, title, link, description,status,embedded, type } = req.query;
         try {

            console.log(type);             
              var result = null;
              var filterSearch  = { isDelete: false};
              
              if( type) 
              {
                  filterSearch["type"] = type;
              }
              else 
              {
                filterSearch["type"] = "0";
              }
            
              
              var columnDisplay =  'name title  image link description status embedded ';
        
              result = await Campaign.find(
                filterSearch ,
                columnDisplay
              )     
              .sort({ 'index' : -1});
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
    add: async (req, res) => {
        try {
            const { name, image,  title, link, description,status,embedded,relCode, company_id , type } = req.body;

            let typeInput = type;
            if(type)

            {

            }
            else 

            {
                typeInput = "0"; 
            }
            var result = await Campaign.create({
                name: name,
                title: title,
                relCode: relCode,
                image: image,
                type: typeInput,
                link: link,
                description: description,
                status:  status,
                embedded: embedded,
                company_id: company_id
            });
             if (result) {
                res.send(Response(200, "Thêm dữ liệu thành công", [], true));
            } else {
                res.send(Response(202, "Thêm dữ liệu thất bại", [], false));
            }
        } catch (err)
        {
            console.log(err);
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err), err, false));
        }
    },
    update: async (req, res) => {
        try {
            const { name,image, title,relCode, link, description,status,embedded, id , type } = req.body;
            var objUpdate = {
                name: name,
                title: title,
                link: link,
                image: image,
                relCode: relCode,
                description: description,
                status:  status,
                embedded: embedded

            };
           let result = await Campaign.updateOne({ _id: ObjectId(id) }, objUpdate);

            if (result) {
                res.send(Response(200, "Cập nhật dữ liệu thành công", [], true));
            } else {
                res.send(Response(202, "Cập nhật dữ liệu thất bại", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },
    delete: async (req, res) => {
            try {
            let body = req.body;
            const objDelete = {
            "isDelete": true
            };
            let result = await  Campaign.updateOne({ _id: ObjectId(body.id ) }, objDelete);

            if (result) {
            res.send(Response(200, "", [], true));
            } else {
            res.send(Response(202, "Xoá dữ liệu thất bại", [], false));
            }
            } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
            }
    }
    
}