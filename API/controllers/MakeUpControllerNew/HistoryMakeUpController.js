const ObjectId = require('mongodb').ObjectId
const HistoryMakeUp = require('../../models/MakeUpCollection/history_makeup')
const CompanyPlugin = require('../../models/PluginCollection/CompanyPluginModel')
const ViewMakeUp = require('../../models/MakeUpCollection/ViewMakeUpModel')
const Response = require('../../helpers/Response');

module.exports = {
    getHistoryMakeUp: async (req, res) => {
        try {
            var result = await HistoryMakeUp.find({ isDelete: false })
            .populate("Company_Id")
            .populate("Product_Id");
            
            if(result){
                res.send(Response(200, "Lấy danh sách lịch sử makeup thành công", result, true));
            } else {
                res.send(Response(202, "Lấy danh sách lịch sử makeup thất bại", result, true));
            }

        } catch (err) {
            res.send(Response(202, err.keyValue, err, false));
        }
    },

    addHistoryMakeUp: async (req, res) => {
        try {
            let { UserName, Phone, Color, Product_Id, Image, Company_Id } = req.body;
            const result = await HistoryMakeUp.create({
                Phone: Phone,
                Color: Color,
                Product_Id: Product_Id,
                Image: Image,
                Company_Id: Company_Id,
            });
            if (result) {
                var resCompany = await CompanyPlugin.findOne({ _id: Company_Id });
                
                if(resCompany) {
                    var resView = await ViewMakeUp.findOne({ slug: resCompany.Slug });
                    if(resView) {
                        await ViewMakeUp.updateOne({ _id: resView._id }, { view: Number(resView.view) + 1 })
                    } else {
                        await ViewMakeUp.create({
                            "company_id": resCompany._id,
                            "slug": resCompany.Slug,
                            "view": "1"
                        })
                    }
                } else {
                    res.send(Response(202, "Không tồn tại công ty này", [], false));
                }

                res.send(Response(200, "Thêm lịch sử makeup thành công", [], true));
            } else {
                res.send(Response(202, "Thêm lịch sử makeup thất bại", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    }
}