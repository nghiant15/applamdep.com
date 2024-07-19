const ObjectId = require('mongodb').ObjectId
const RolePlugin = require('../../models/PluginCollection/RolePluginModel')
const Response = require('../../helpers/Response');

module.exports = {
    getListRole: async (req, res) => {
        try {
            var result = await RolePlugin.find({ isDelete: false });
            
            if(result){
                res.send(Response(200, "Lấy danh sách quyền thành công", result, true));
            } else {
                res.send(Response(202, "Lấy danh sách quyền thất bại", result, true));
            }

        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    addRole: async (req, res) => {
        try {
            let body = req.body;
            const result = await RolePlugin.create({
                "Name": body.Name,
                "Type": body.Type
            });
            if (result) {
                res.send(Response(200, "Success", [], true));
            } else {
                res.send(Response(202, "Fail", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    updateRole: async (req, res) => {
        try {
            let body = req.body;
            const objUpdate = {
                "Name": body.Name,
                "Status": body.Status
            };

            let result = await RolePlugin.updateOne({ _id: ObjectId(body.id) }, objUpdate);

            if (result) {
                res.send(Response(200, "Success", [], true));
            } else {
                res.send(Response(202, "Fail", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    deleteRole: async (req, res) => {
        try {
            let body = req.body;
            const objDelete = {
                "isDelete": true
            };
            let result = await RolePlugin.updateOne({ _id: ObjectId(body.id) }, objDelete);

            if (result) {
                res.send(Response(200, "Success", [], true));
            } else {
                res.send(Response(202, "Fail", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    }

    //
}