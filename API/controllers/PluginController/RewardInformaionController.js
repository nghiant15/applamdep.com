const ObjectId = require('mongodb').ObjectId
const RewardInformation = require('../../models/PluginCollection/RewardInformationModel')
const Response = require('../../helpers/Response');

module.exports = {
    getListReward: async (req, res) => {
        try {
            var result = await RewardInformation.find({ isDelete: false }).populate("Company_Id", "Name");
            
            if(result){
                res.send(Response(200, "Lấy danh sách thành công", result, true));
            } else {
                res.send(Response(202, "Lấy danh sách thất bại", result, true));
            }

        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    getListRewardForCompany: async (req, res) => {
        try {
            let body = req.body;
            var result = await RewardInformation.find({ isDelete: false, Company_Id: body.Company_Id });
            
            if(result){
                res.send(Response(200, "Lấy danh sách thành công", result, true));
            } else {
                res.send(Response(202, "Lấy danh sách thất bại", result, true));
            }

        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    addReward: async (req, res) => {
        try {
            let body = req.body;
            const result = await RewardInformation.create({
                "Subject": body.Subject,
                "Content": body.Content,
                "Company_Id": body.Company_Id,
                "Templates": body.Templates,
                "Link": body.Link
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

    updateReward: async (req, res) => {
        try {
            let body = req.body;
            const objUpdate = {
                "Subject": body.Subject,
                "Content": body.Content,
                "Templates": body.Templates,
                "Status": body.Status,
                "Link": body.Link
            };

            let result = await RewardInformation.updateOne({ _id: ObjectId(body.id) }, objUpdate);

            if (result) {
                res.send(Response(200, "Success", [], true));
            } else {
                res.send(Response(202, "Fail", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    deleteReward: async (req, res) => {
        try {
            let body = req.body;
            const objDelete = {
                "isDelete": true
            };
            let result = await RewardInformation.updateOne({ _id: ObjectId(body.id) }, objDelete);

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