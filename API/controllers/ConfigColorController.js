const ObjectId = require('mongodb').ObjectId
const ModelQuery = require('../models/ConfigColorModel')
const Response = require('../helpers/Response');

module.exports = {
    //User Table
    createOrUpdate: async (req, res) => {
        try {
            const { company_id, mainColor, sub_mainColor,sub2_mainColor, button_color,sucess_color,error_color,
                text_mainColor } = req.body;
                const updateQuerry = await ModelQuery.updateOne(
                         { company_id: company_id },
                         { 
                            sub2_mainColor: sub2_mainColor,
                            sub_mainColor: sub_mainColor,
                            button_color: button_color,
                            sucess_color: sucess_color,
                            error_color: error_color,
                            text_mainColor: text_mainColor,
                            mainColor: mainColor
                         }
                     );
                if (updateQuerry) {
                    res.send(Response(202, "Cập nhật dữ liệu thành công !!!", [], true));
                } else {
                    res.send(Response(202, "Cập nhật dữ liệu thất bại !!", [], false));
                }
           

        } catch (err) {
            console.log(err);
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    get: async (req, res) => {
        try {

            const {company } = req.params;
            console.log(company);
    
           
            const result = await ModelQuery.findOne({ company_id: company });
            if (result) {
                res.send(Response(202, "Lấy dữ liệu thành công !!!", result, true));
            } else {
                const modelInsert = new ModelQuery({
                        mainColor: "#008060",
                        sub_mainColor: "#008060",
                        sub2_mainColor: "#008060",
                        button_color: "#008060",
                        text_mainColor: "#002E25",
                        sucess_color: "#3bb54a",
                        error_color: "#3d0d13",
                        background_color: "#FFFFFF",
                        company_id: company
                });
                const colorConfig =  await modelInsert.save();
                res.send(Response(202, "Lấy dữ liệu thành công !!!", colorConfig, true));
            }

        } catch (err) {
            console.log(err);
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    }
}