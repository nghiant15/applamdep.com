const ObjectId = require('mongodb').ObjectId
const RoleSubAdminModel = require('../../models/PluginCollection/RoleSubAdminModel')
const Response = require('../../helpers/Response');

module.exports = {
    addRoleSubAdminModel: async (req, res) => {
        try {
            let body = req.body;
            const count = await RoleSubAdminModel.countDocuments({
                "user_id": body.user_id
            });
            if(count > 0) {
                const result = await RoleSubAdminModel.updateOne({
                    "user_id": body.user_id,
                }, { "sidebar_id": body.sidebar });

                if (result) {
                    res.send(Response(200, "Đã cập nhật thành công thành công !!!", [], true));
                } else {
                    res.send(Response(202, "Cập nhật thất bại !!!", [], false));
                }
            } else {
                const result = await RoleSubAdminModel.create({
                    "user_id": body.user_id,
                    "sidebar_id": body.sidebar,
                });
                if (result) {
                    res.send(Response(200, "Đã thêm thành công !!!", [], true));
                } else {
                    res.send(Response(202, "Thêm thất bại !!!", [], false));
                }
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    getRoleSubAdminBy_Id: async (req, res) => {
        try {
            let body = req.body;
            const result = await RoleSubAdminModel.findOne({
                "user_id": body.user_id
            }, `sidebar_id`);
            
            if (result) {
                res.send(Response(200, "Đã lấy thành công !!!", result, true));
            } else {
                res.send(Response(202, "Lấy thất bại !!!", {
                    "sidebar_id": []
                }, false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    }


}