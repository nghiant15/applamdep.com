const ObjectId = require('mongodb').ObjectId
const User = require('../../models/PluginCollection/UserPluginModel')
const Package = require('../../models/PluginCollection/PackageProductModel')
const MailQueue = require('../../models/MailQueue')
const Response = require('../../helpers/Response');


module.exports = {
    //User Table
    getInfomation: async (req, res) => {
        try {
            var saleListData = await User.find({ isDelete: false, isSale: true });

            var packagelist = await Package.find({ isDelete: false }).sort({ _id: -1 });
            res.send(Response(200, "Success", 
            {
                dataSale: saleListData,
                dataPackage: packagelist
            }
            , true));

        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    }


}