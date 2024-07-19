const ObjectId = require('mongodb').ObjectId
const PluginCompany = require('../../models/PluginCollection/CompanyPluginModel')
const PluginOrder = require('../../models/PluginCollection/PluginSaveOrderModel')
const lodash = require('lodash')
const Response = require('../../helpers/Response');

module.exports = {
    checkAccessURL: async (req, res) => {
        try {
            const { base_url, slug } = req.body;
            let count = 0;

            var resultCompany = await PluginCompany.aggregate([
                {
                    $match: { isDelete: false, Status: 'Actived', Slug: slug }
                }
            ])

            if (resultCompany) {

                var resultOrder = await PluginOrder.aggregate([
                    {
                        $match: { isDelete: false, Company_Id: String(resultCompany[0]._id) }
                    }
                ])

                if (resultOrder) {

                    for (let i = 0; i < resultOrder.length; i++) {
                        var arrFeat = resultOrder[i];
                        var song = lodash.find(arrFeat.Array_Feature, { Value: base_url, Status: '1' });

                        if (song) {
                            let date = Math.ceil(Math.abs(new Date(arrFeat.End_Date) - new Date(Date.now())) / (1000 * 60 * 60 * 24))
                            if (date > 0) {
                                count = count + 1
                                break;
                            }
                        }
                    }

                    if (count > 0) {
                        res.send(Response(200, `Công ty được phép truy cập vào đường dẫn theo link ${base_url}${slug}`, {
                            isAccess: true,
                            company_data: resultCompany[0]
                        }, true));
                    } else {
                        res.send(Response(202, `Công ty đã hết hạn truy cập vào ${base_url}${slug} vui lòng gia hạn thêm hoặc không tồn tại đường dẫn này`, {
                            isAccess: false,
                            company_data: []
                        }, false));
                    }
                } else {
                    res.send(Response(202, "Công ty chưa đăng ký tính năng nào !!!", [], false));
                }
            } else {
                res.send(Response(202, "Không tồn tại công ty này hoặc đã bị ẩn trong cơ sở dữ liệu !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, err, err, false));
        }

    },

    checkAccessSlug: async (req, res) => {
        try {
            const { slug } = req.body;
            console.log(slug);
            var resultCompany = await PluginCompany.find({
                isDelete: false,
                Status: 'Actived',
                Slug: { $regex: new RegExp("^" + slug, "i") }
            });
            console.log(resultCompany);

            if (resultCompany) {
                const isLargeNumber = (element) => element.Slug.toLowerCase() === slug.toLowerCase();
                const index = resultCompany.findIndex(isLargeNumber);

                if (resultCompany[index]) {
                    res.send(Response(200, `Công ty được phép truy cập`, {
                        isAccess: true,
                        company_data: resultCompany[0]
                    }, true));
                } else {
                    res.send(Response(202, "Không tồn tại công ty này hoặc đã bị ẩn trong cơ sở dữ liệu !!!", [], false));
                }
            } else {
                res.send(Response(202, "Không tồn tại công ty này hoặc đã bị ẩn trong cơ sở dữ liệu !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, err, err, false));
        }

    },

    checkAccessURL_New: async (req, res) => {
        try {
            const { base_url, company_id } = req.body;
            let count = 0;

            var resultOrder = await PluginOrder.aggregate([
                {
                    $match: { isDelete: false, Company_Id: String(company_id) }
                }
            ])

            if (resultOrder) {

                for (let i = 0; i < resultOrder.length; i++) {
                    var arrFeat = resultOrder[i];
                    var song = lodash.find(arrFeat.Array_Feature, { Value: base_url, Status: '1' });
                    if (song) {
                        let date = Math.ceil(Math.abs(new Date(arrFeat.End_Date) - new Date(Date.now())) / (1000 * 60 * 60 * 24))
                        if (date > 0) {
                            count = count + 1
                            break;
                        }
                    }
                }

                if (count > 0) {
                    res.send(Response(200, `Công ty được phép truy cập vào đường dẫn ${base_url}`, {
                        isAccess: true,
                    }, true));
                } else {
                    res.send(Response(202, `Công ty đã hết hạn truy cập vào ${base_url} vui lòng gia hạn thêm hoặc không tồn tại đường dẫn này`, {
                        isAccess: false,
                    }, false));
                }
            } else {
                res.send(Response(202, "Công ty chưa đăng ký tính năng nào !!!", [], false));
            }

        } catch (err) {
            res.send(Response(202, err, err, false));
        }

    },
}

