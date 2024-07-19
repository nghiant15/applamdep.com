const ObjectId = require('mongodb').ObjectId
const SideBarPart = require('../../models/PluginCollection/SideBarPart')
const Response = require('../../helpers/Response');

module.exports = {
    addSideBarPart: async (req, res) => {
        try {
            let body = req.body;
            const result = await SideBarPart.create({
                "key": body.key,
                "value": body.value,
            });
            if (result) {
                res.send(Response(200, "Đã thêm thành công !!!", [], true));
            } else {
                res.send(Response(202, "Thêm thất bại !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },
    getSideBarPart: async (req, res) => {
        try {
            let body = req.body;
            const result = await SideBarPart.find({
                value: { $in: body.value }
            });
            if (result) {
                res.send(Response(200, "Lấy thành công !!!", [], true));
            } else {
                res.send(Response(202, "Lấy thất bại !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    }
}