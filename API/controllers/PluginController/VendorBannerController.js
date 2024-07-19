const ObjectId = require('mongodb').ObjectId
const ProductSpecial = require('../../models/VendorBanner')
const Response = require('../../helpers/Response');
module.exports = {
    getALl: async (req, res) => {
        try {
            var result = await ProductSpecial.find({ isDelete: false });
             
            if (result) {
                res.send(Response(200, "Lấy danh sách liên hệ thành công", result, true));
            } else {
                res.send(Response(202, "Lấy danh sách liên hệ thất bại", result, true));
            }

        } catch (err) {
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },

    getALl_Company: async (req, res) => {
        const { company } = req.params;
        const result = await ProductSpecial.find({
            isDelete: false });

            if (result) {
                res.send(Response(200, "Lấy danh sách liên hệ thành công", result, true));
            } else {
                res.send(Response(202, "Lấy danh sách liên hệ thất bại", result, true));
            }
          
    
    },
    add: async (req, res) => {
        try {
            const { name,des,image_link, link, company_id,image_mobile } = req.body;
        
            var result = await ProductSpecial.create({
                name: name,
                des: "",
                image_mobile: image_mobile,
                hrefLink : link,
                image_link: image_link
            });
             if (result) {
                res.send(Response(200, "Thêm dữ liệu thành công", [], true));
            } else {
                res.send(Response(202, "Thêm dữ liệu thất bại", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err), err, false));
        }
    },

    update: async (req, res) => {
        try {
            // const { name,des,image_link,hrefLink, company_id } = req.body;
            const { id, name, des, image, link, image_link,image_mobile } = req.body;
           
            var objUpdate = {
                name: name,
                des: des,
                hrefLink : link,
                image_mobile: image_mobile,
                image_link: image_link
              
            };
            //}

            // console.log(objUpdate);

            let result = await ProductSpecial.updateOne({ _id: ObjectId(id) }, objUpdate);

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
            let result = await  ProductSpecial.updateOne({ _id: ObjectId(body.id) }, objDelete);

            if (result) {
                res.send(Response(200, "Xoá dữ liệu thành công", [], true));
            } else {
                res.send(Response(202, "Xoá dữ liệu thất bại", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },
     addBanner: async (req, res) => {
        try {
            const { company_id, banner = "https://applamdep.com/banner1.jpg", sub_banner = "https://applamdep.com/banner1.jpg" } = req.body;
            const count = await BannerModel.countDocuments({ company_id: company_id });
            if (count > 0) {
                const res = await BannerModel.updateOne({ company_id: company_id }, { banner: banner, sub_banner: sub_banner });
                if (res) {
                    res.send(Response(202, "Cập nhật dữ liệu thành công !!!", [], true));
                } else {
                    res.send(Response(202, "Cập nhật dữ liệu thất bại !!", [], false));
                }
            } else {
                const res = await BannerModel.create({ company_id: company_id, banner: banner, sub_banner: sub_banner });
                if (res) {
                    res.send(Response(202, "Thêm dữ liệu thành công !!!", res, true));
                } else {
                    res.send(Response(202, "Thêm dữ liệu thất bại !!", [], false));
                }
            }

        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    }

    //
}