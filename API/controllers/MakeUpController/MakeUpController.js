const ObjectId = require('mongodb').ObjectId
const Product = require('../../models/MakeUpCollection/product')
const Brand = require('../../models/MakeUpCollection/brand')
const Color = require('../../models/MakeUpCollection/color')

const Response = require('../../helpers/Response');

module.exports = {
    getColor: async (req, res) => {
        try {
            const { type_id } = req.body;
            //Danh sách sản phẩm
            const arrProducts = await Product.find({ type_id: type_id });
            let arrColors = [];
            for(let i = 0; i < arrProducts.length; i++){
                const arrColor = await Color.find({ product_id: arrProducts[i]._id });
                arrColors = arrColors.concat(arrColor)
            }

            res.send(Response(200, `Get color success`, arrColors, true));
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    getDataMakeUp: async (req, res) => {
        try {
            const { hex } = req.body;
            let arrBrand = [];
            //Danh sách sản phẩm
            const resultProduct = await Color.find({ hex: hex }).populate("product_id");
            
            for(let i = 0; i < resultProduct.length; i++){
                const resultBrand = await Brand.find({ _id: resultProduct[i].product_id.brand_id });
                
                if(resultBrand){
                    arrBrand.push(resultBrand)
                }
            }

            if(resultProduct){
                res.send(Response(200, `Lấy danh sách thành công !!!`, { list_product: resultProduct, list_brand: arrBrand }, true));
            } else {
                res.send(Response(200, `Lấy danh sách thất bại !!!`, [], false));
            }
        
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },
}