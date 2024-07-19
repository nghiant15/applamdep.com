const ObjectId = require('mongodb').ObjectId
const lodash = require('lodash')
const Customer = require('../../models/PluginCollection/CustomerModel')
const Company = require('../../models/PluginCollection/CompanyPluginModel')
const Response = require('../../helpers/Response');

module.exports = {
    getListCustomer: async (req, res) => {
        try {
            var result = await Customer.find({ isDelete: false }).populate( "Name");
            var arrTemp = [];
            var arrTempCount = [];

            for(let i = 0; i < result.length; i++){
                const found = arrTemp.some(el => el.Phone === result[i].Phone);
                if (!found && result[i].Phone != '' && result[i].Phone != undefined) 
                {
                    arrTemp.push(result[i]);
                }
            }

            if (result) {
                for(let i = 0; i < arrTemp.length; i++){
                    var arrCount = await Customer.countDocuments({ Phone: arrTemp[i].Phone });
                    arrTempCount.push(arrCount)
                }
                let arrResult = lodash.reverse(arrTemp);
                let arrCounts = lodash.reverse(arrTempCount);
                res.send(Response(200, "Lấy gói dữ liệu khách hàng thành công", {result: arrResult, Count: arrCounts }, true));
            } else {
                res.send(Response(202, "Lấy gói dữ liệu khách hàng thất bại", [], true));
            }

        } catch (err) {
            res.send(Response(202, "Đã có lỗi xảy ra: " + JSON.stringify(err), err, false));
        }
    },

    getListCustomerForCompany: async (req, res) => {

        console.log(req.body);
        try {

        
            var result = await Customer.find({ isDelete: false, Company_Id: req.body.Company_Id }).populate("Company_Id", "Name");
            var arrTemp = [];
            var arrTempCount = [];

           

            for(let i = 0; i < result.length; i++){
                const found = arrTemp.some(el => el.Phone === result[i].Phone);
                if (!found && result[i].Phone != '' && result[i].Phone != undefined) arrTemp.push(result[i]);
            }

            if (result) {
                for(let i = 0; i < arrTemp.length; i++){
                    var arrCount = await Customer.countDocuments({ Phone: arrTemp[i].Phone, Company_Id: req.body.Company_Id });
                    arrTempCount.push(arrCount)
                }
                let arrResult = lodash.reverse(arrTemp);
                let arrCounts = lodash.reverse(arrTempCount);
                res.send(Response(200, "Lấy gói dữ liệu khách hàng thành công", {result: arrResult, Count: arrCounts }, true));
            } else {
                res.send(Response(202, "Lấy gói dữ liệu khách hàng thất bại", [], true));
            }

        } catch (err) {
            res.send(Response(202, "Đã có lỗi xảy ra: " + JSON.stringify(err), err, false));
        }
    },

    getListCustomerForCompanyByMonth: async (req, res) => {
        try {
            const { Company_Id, month } = req.body;
            var result = await Customer.find({ 
                isDelete: false, 
                Company_Id: Company_Id,
                Create_Date: {
                    "$gte": `${new Date().getFullYear()}-${month}-01T03:27:49.926Z`,
                    "$lte": `${new Date().getFullYear()}-${month}-31T03:27:49.926Z`
                }, 
            }).populate("Company_Id", "Name");
            var arrTemp = [];
            var arrTempCount = [];

            for(let i = 0; i < result.length; i++){
                const found = arrTemp.some(el => el.Phone === result[i].Phone);
                if (!found && result[i].Phone != '' && result[i].Phone != undefined) arrTemp.push(result[i]);
            }

            if (result) {
                for(let i = 0; i < arrTemp.length; i++){
                    var arrCount = await Customer.countDocuments({ 
                        Phone: arrTemp[i].Phone, 
                        Company_Id: req.body.Company_Id,
                        Create_Date: {
                            "$gte": `${new Date().getFullYear()}-${month}-01T03:27:49.926Z`,
                            "$lte": `${new Date().getFullYear()}-${month}-31T03:27:49.926Z`
                        },  
                    });
                    arrTempCount.push(arrCount)
                }
                res.send(Response(200, "Lấy gói dữ liệu khách hàng thành công", {result: arrTemp, Count: arrTempCount }, true));
            } else {
                res.send(Response(202, "Lấy gói dữ liệu khách hàng thất bại", [], true));
            }

        } catch (err) {
            res.send(Response(202, "Đã có lỗi xảy ra: " + JSON.stringify(err), err, false));
        }
    }
    //
}