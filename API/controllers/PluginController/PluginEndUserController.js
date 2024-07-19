const ObjectId = require('mongodb').ObjectId
const EndUser = require('../../models/PluginCollection/EndUser')
const Role = require('../../models/PluginCollection/RolePluginModel')
const MailQueue = require('../../models/MailQueue')
const Response = require('../../helpers/Response');
var sendMail = require('../../services/service_mail');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const constans = require('../../config/configDB')
const seeder = require('../../middleware/seeder')
var base64 = require('js-base64').Base64;

module.exports = {
    //User Table
    getListUser: async (req, res) => {
        try {
            const { id, limit } = req.query;
            const { condition } = req.body;
            if (condition == null) {
                if (id == null) {
                    var dataUser = await User.find({ isDelete: false, isSale: true }).limit(Number(limit));
                } else {
                    var dataUser = await User.findOne({ _id: id, isDelete: false, isSale: true }).limit(Number(limit));
                }
            } else {
                var dataUser = await User.find(condition).limit(Number(limit));
            }
            res.send(Response(200, "Success", dataUser, true));

        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    getAllUser: async (req, res) => {
        try {
            var role = await Role.findOne({ isDelete: false, Type: "1" });
            console.log(role._id)
            var dataUser = await User.find({ isDelete: false, Role_Id: role._id });
            if (dataUser) {
                res.send(Response(200, "Get Data Success !!!", dataUser, true));
            } else {
                res.send(Response(202, "Get Data Fail !!!", dataUser, true));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    getSubSaleUser: async (req, res) => {
        try {
            var role = await Role.findOne({ isDelete: false, Type: "5" });
            console.log(req)
            var dataUser = await User.find({ isDelete: false, Role_Id: role._id, Company_Id: req.company_id });
            if (dataUser) {
                res.send(Response(200, "Get Data Success !!!", dataUser, true));
            } else {
                res.send(Response(202, "Get Data Fail !!!", dataUser, true));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    getUserByID: async (req, res) => {
        try {
            var body = req.body;
            var dataUser = await User.findOne({ _id: req.user._id, isDelete: false }).populate("Company_Id");


            if (dataUser) {
                res.send(Response(200, "Success", dataUser, true));
            } else {
                res.send(Response(200, "Fail to load user", [], true));
        }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    getUserByID_withBody: async (req, res) => {
        try {
            var body = req.body;
            var dataUser = await User.findOne({ _id: body.id, isDelete: false });

            if (dataUser) {
                res.send(Response(200, "Success", dataUser.Name, true));
            } else {
                res.send(Response(200, "Fail to load user", [], true));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    LoginAdmin: async (req, res) => {
        try {
            var cache = req.app.locals.cache
            const mykeys = cache.keys();
            cache.del(mykeys);
            const { username, password } = req.body;
            var dataUser = await User.findOne().or([{ UserName: username, Password: password }, { Email: username, Password: password }]);
            console.log(username)
            console.log(password)
            if (dataUser != null) {
                var role = await Role.findOne({ _id: dataUser.Role_Id });
                const token = jwt.sign({ _id: dataUser._id, role: role.Name, company_id: dataUser.Company_Id, type: role.Type }, "1234567890qwertyuiopasdfghjklzxcvbnm");
                res.send(Response(200, "Login Success !!!", { "data": dataUser, "token": token }, true));
            } else {
                res.send(Response(202, "Login Fail !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }

    },
    userLogin: async (req, res) => {
        try {
            var cache = req.app.locals.cache
            const mykeys = cache.keys();
            cache.del(mykeys);
            const { username, password } = req.body;
            var dataUser = await User.findOne().or([{ UserName: username, Password: password }, { Email: username, Password: password }]);
       
            if (dataUser != null) {

                const token = jwt.sign({ _id: dataUser._id, company_id: dataUser.Company_Id }, "1234567890qwertyuiopasdfghjklzxcvbnm");
                res.send(Response(200, "Login Success !!!", { "data": dataUser, "token": token }, true));
            } else {
                res.send(Response(202, "Login Fail !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }

    },

    ForgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            let dataUser = await User.findOne({ Email: email });

            if (dataUser != null) {
                var mail = await MailQueue.create({
                    email: email,
                    user_id: dataUser._id,
                    type: "1",
                    code: base64.encode(dataUser._id + "_xxx_" + new Date().getTime()),
                    isSend: false
                });
                if (mail) {
                    res.send(Response(200, "Thành công !!!", [], true));
                } else {
                    res.send(Response(202, "Có lỗi đã xảy ra !!!", [], false));
                }
            } else {
                res.send(Response(202, "Hiện tại địa chỉ mail này không tòn tại trong hệ thống !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },

    ResetPassword: async (req, res) => {
        try {
            const { code, password } = req.body;
            let userID = base64.decode(code).split("_xxx_")[0];

            let result = await User.updateOne({ _id: ObjectId(userID) }, { 
                Password: md5(password)
            });

            if (result) {
                await MailQueue.updateOne({ code: code }, { isUsed: true })
                res.send(Response(200, "Thay đổi mật khẩu thành công !!!", [], true));
            } else {
                res.send(Response(202, "Thay đổi mật khẩu thất bại !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },

    checkUsedLink: async (req, res) => {
        try {
            const { code } = req.body;
            let result = await MailQueue.findOne({ code: code });

            if (result) {
                if(result.isUsed){
                    res.send(Response(202, "Đường dẫn đã được sử dụng hoặc hết hạn dùng !!!", [], false));
                } else {
                    res.send(Response(200, "Đường dẫn được phép sử dụng !!!", [], true));
                }
            } else {
                res.send(Response(202, "Thay đổi mật khẩu thất bại !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },

    generateAuthToken: async (req, res) => {
        var user = this;
        const token = jwt.sign({ _id: user._id }, "1234567890qwertyuiopasdfghjklzxcvbnm");
        return token;
    },

    addUser: async (req, res) => {
        try {
            let body = req.body;
           
            const result = await User.create(
             {
                "name": body.Name,
                "email": body.Email,
                "phone": body.Phone,
                "company_Id": body.Company_Id,
                "username": body.UserName,
                "password": md5(body.Password)
            });
            if (result) {
                res.send(Response(200, "Success", [], true));
            } else {
                res.send(Response(202, result, [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    addSubSale: async (req, res) => {
        try {
            let body = req.body;
            var role = await Role.findOne({ isDelete: false, Type: "5" });
            console.log(body.Company_Id)
            const result = await User.create({
                "Name": body.Name,
                "Email": body.Email,
                "Phone": body.Phone,
                "Address": body.Address,
                "Company_Id": body.Company_Id,
                "Role_Id": role._id,
                "UserName": body.UserName,
                "Password": md5(body.Password)
            });
            if (result) {
                //send Mail
                // await sendMail.verifyEmail(result.Name, result.Email,
                //     `${constans.baseURL}${constans.linkAPI}${result._id}&email=${result.Email}`);
                res.send(Response(200, "Success", [], true));
            } else {
                res.send(Response(202, result, [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại !!!", "Dữ liệu đã tồn tại !!!", false));
        }
    },

    addSale: async (req, res) => {
        try {
            let body = req.body;
            var role = await Role.findOne({ isDelete: false, Type: "1" });
            const result = await User.create({
                "Name": body.Name,
                "Email": body.Email,
                "Phone": body.Phone,
                "Address": body.Address,
                "isSale": true,
                "Role_Id": role._id,
                "UserName": body.UserName,
                "Password": md5(body.Password),
                "Discount": 5
            });
            if (result) {
                //send Mail
                // await sendMail.verifyEmail(result.Name, result.Email,
                //     `${constans.baseURL}${constans.linkAPI}${result._id}&email=${result.Email}`);
                res.send(Response(200, "Success", [], true));
            } else {
                res.send(Response(202, result, [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    updateUser: async (req, res) => {
        try {
            let body = req.body;
            
            const objUpdate = {
                "Name": body.Name,
                "Email": body.Email,
                "Phone": body.Phone,
                "Address": body.Address,
                "UserName": body.UserName,
                "Password": md5(body.Password),
                "Status": body.Status,
            };

            let result = await User.updateOne({ _id: ObjectId(body.id) }, objUpdate);

            if (result) {
                res.send(Response(200, "Success", [], true));
            } else {
                res.send(Response(202, "Fail", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    updateUserCompany: async (req, res) => {
        try {
            let body = req.body;
            
            const objUpdate = {
                "Name": body.Name,
                "Email": body.Email,
                "Phone": body.Phone,
                "Address": body.Address,
                "UserName": body.UserName,
                "Password": body.Password,
                "Message_Code": body.Message_Code,
                "Status": body.Status,
            };

            let result = await User.updateOne({ _id: ObjectId(body.id) }, objUpdate);

            if (result) {
                res.send(Response(200, "Success", [], true));
            } else {
                res.send(Response(202, "Fail", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    deleteUser: async (req, res) => {

        let body = req.body;
        const objDelete = {
            "isDelete": true
        };
        let result = await User.updateOne({ _id: ObjectId(body.id) }, objDelete);

        if (result) {
            res.send(Response(200, "Success", [], true));
        } else {
            res.send(Response(202, "Fail", [], false));
        }

    },

    updateStatus: async (req, res) => {
        try {
            let { id, email } = req.query;
            let result = await User.findOne({ _id: ObjectId(id), Email: email });
            if (result != null) {
                let isOk = await User.updateOne({ _id: ObjectId(id), Email: email }, { Status: "Actived" });
                if (isOk) {
                    res.send(Response(202, "Update status success", [], true));
                } else {
                    res.send(Response(202, "Update status fail", [], false));
                }
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    verifyPhone: async (req, res) => {

    },

    resetPassword: async (req, res) => {
        try {
            let body = req.body;
            var resultUser = await User.findOne({ _id: ObjectId(body.id) });
            if (md5(body.old_password) == resultUser.Password) {
                if (body.new_password == body.confirm_password) {
                    const objUpdate = {
                        "Password": md5(body.new_password)
                    };

                    let result = await User.updateOne({ _id: ObjectId(body.id) }, objUpdate);

                    if (result) {
                        res.send(Response(200, "Update Password Success !!!", [], true));
                    } else {
                        res.send(Response(202, "Fail to update password !!!", [], false));
                    }
                }
            } else {
                res.send(Response(202, "Old password is incorrect !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    updatePassword: async (req, res) => {
        try {
            let body = req.body;
            const objUpdate = {
                "Password": md5(body.new_password)
            };

            let result = await User.updateOne({ _id: ObjectId(body.id) }, objUpdate);

            if (result) {
                res.send(Response(200, "Update Password Success !!!", [], true));
            } else {
                res.send(Response(202, "Fail to update password !!!", [], false));
            }

        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },
}