const ObjectId = require('mongodb').ObjectId
const RewardTransaction = require('../../models/PluginCollection/RewardTransactionModel')
const Response = require('../../helpers/Response');

module.exports = {
    getListRewardTransaction : async (req, res) => {
        try {
            var result = await RewardTransaction.find({ isDelete: false });
            
            if(result){
                res.send(Response(200, "Lấy danh sách quyền thành công", result, true));
            } else {
                res.send(Response(202, "Lấy danh sách quyền thất bại", result, true));
            }

        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    addRewardTransaction : async (req, res) => {
        try {
            let body = req.body;
            const result = await RewardTransaction.create({
                "Phone": body.Phone,
                "Reward_Id": body.Reward_Id,
                "Company_Id": body.Company_Id
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

    updateRewardTransaction : async (req, res) => {
        try {
            let body = req.body;
            const objUpdate = {
                "Phone": body.Phone,
                "Reward_Id": body.Reward_Id,
                "Status": body.Status
            };

            let result = await RewardTransaction.updateOne({ _id: ObjectId(body.id) }, objUpdate);

            if (result) {
                res.send(Response(200, "Success", [], true));
            } else {
                res.send(Response(202, "Fail", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    deleteRewardTransaction : async (req, res) => {
        try {
            let body = req.body;
            const objDelete = {
                "isDelete": true
            };
            let result = await RewardTransaction.updateOne({ _id: ObjectId(body.id) }, objDelete);

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