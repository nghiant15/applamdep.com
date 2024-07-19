const ObjectId = require('mongodb').ObjectId
const BannerModel = require('../models/BannerModel')
const Response = require('../helpers/Response');

module.exports = {
    //User Table
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
    },

    getBanner: async (req, res) => {
        try {
            const { company_id } = req.body;
            const result = await BannerModel.findOne({ company_id: company_id });
            if (result) {
                res.send(Response(202, "Lấy dữ liệu thành công !!!", result, true));
            } else {
                res.send(Response(202, "Lấy dữ liệu thất bại !!!", {
                    banner: "",
                    sub_banner: ""
                }, false));
            }

        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },
    addImage: async (req, res) => {
        res.send(req.file)
    },
}