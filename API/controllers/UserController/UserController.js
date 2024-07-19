const ObjectId = require('mongodb').ObjectId
const User = require('../../models/EndUserModel')

const BeautyGame = require('../../models/PluginCollection/BeautyGame');
const EndUserModel = require('../../models/EndUserModel');
const HistorySkin = require('../../models/PluginCollection/HistorySkinModel');
const Response = require('../../helpers/Response');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

module.exports = {
    //User Table
      getAllUser: async (req, res) => {
        try {
            var filterSearch = { isDelete: false };
            const { phone } =  req.body;

            console.log(req.body);
            filterSearch["create_date"] = 
            {
                $gte: new Date(2022, 7, 20)
            };
            if(phone)
            {

                filterSearch["phone"] = { $regex: '.*' + phone + '.*' };
            }

            var dataUser = await User.find(filterSearch).sort( { "create_date": -1 } );
            if (dataUser) {
                res.send(Response(200, "Lấy dữ liệu thành công !!!", dataUser, true));
            } else {
                res.send(Response(202, "Lấy dữ liệu thất bại !!!", [], true));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    getAllUserNew: async (req, res) => {
        try {
            var filterSearch = { isDelete: false };
            const { phone,company_id, limit,page} =  req.body;
            const fromDate = req.body.fromDate || null;
            const endDate = req.body.endDate || null;
            const pageNumber = page || 1;
            const limit1 = limit || 20;
            const skip = pageNumber * limit1;
            var dataResult =  {};
        
            if(fromDate && endDate )
            {

                filterSearch["create_date"] = 
                    {
                        
                        $gte: fromDate,
                        $lte: endDate
                    };

            }
        

            if(phone)
            {

                filterSearch["phone"] = { $regex: '.*' + phone + '.*' };
            }
            if(company_id)
            {

                filterSearch["company_id"] = company_id;
            }
           
            
            console.log(filterSearch);
     
            var dataUser = await User.find(filterSearch)
            .limit(Number(limit1))
            .skip(Number(pageNumber - 1) * Number(limit1
                ))
            .sort( { "score": -1 } );

            
            if (dataUser) {
                dataResult.data = dataUser;
                dataResult.total = 100;
                
                res.send(Response(200, "Lấy dữ liệu thành công !!!", dataResult, true));
            } else {
                res.send(Response(202, "Lấy dữ liệu thất bại !!!", [], true));
            }
        } catch (err) {
            console.log(err);
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    

    exportUserNew: async (req, res) => {
        try {
            var filterSearch = { isDelete: false };
            const { phone,company_id, limit,page} =  req.body;
            const fromDate = req.body.fromDate || null;
            const endDate = req.body.endDate || null;
            const pageNumber = page || 1;
            const limit1 = limit || 20;
            const skip = pageNumber * limit1;
            var dataResult =  {};
        
            if(fromDate && endDate )
            {

                filterSearch["create_date"] = 
                    {
                        
                        $gte: fromDate,
                        $lte: endDate
                    };

            }
        

            if(phone)
            {

                filterSearch["phone"] = { $regex: '.*' + phone + '.*' };
            }
            if(company_id)
            {

                filterSearch["company_id"] = company_id;
            }
           
            
            console.log(filterSearch);
     
            var dataUser = await User.find(filterSearch)
          
            .sort( { "score": -1 } );

            
            if (dataUser) {
                dataResult.data = dataUser;
                
                
                res.send(Response(200, "Lấy dữ liệu thành công !!!", dataResult, true));
            } else {
                res.send(Response(202, "Lấy dữ liệu thất bại !!!", [], true));
            }
        } catch (err) {
            console.log(err);
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },
    getEndUserById: async (req, res) => {
        try {
            var dataUser = await User.findOne({ isDelete: false, _id: req.body.id });
            if (dataUser) {
                res.send(Response(200, "Lấy dữ liệu thành công !!!", dataUser, true));
            } else {
                res.send(Response(202, "Lấy dữ liệu thất bại !!!", {}, true));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    getEndUserByIdV3: async (req, res) => {
        try {
            var dataUser = await User.findOne({ isDelete: false, _id: req.user._id });
            if (dataUser) {
                res.send(Response(200, "Lấy dữ liệu thành công !!!", dataUser, true));
            } else {
                res.send(Response(202, "Lấy dữ liệu thất bại !!!", {}, true));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    getEndUserByIdv2: async (req, res) => {

        const {id} =  req.body;
        try {
            var dataUser = await User.findOne({ isDelete: false, _id: ObjectId(id) });
            if (dataUser) {
                res.send(Response(200, "Lấy dữ liệu thành công !!!", dataUser, true));
            } else {
                res.send(Response(202, "Lấy dữ liệu thất bại !!!", {}, true));
            }
        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    LoginEndUser: async (req, res) => {
        try {
            const { password, username,phoneNumber,company_id } = req.body;
            console.log(req.body);
            var dataUser = await User.findOne()
            .or([
                { phone:phoneNumber,isDelete: false}
            ]);
            if (dataUser != null) {
                const token = jwt.sign({ _id: dataUser._id }, "qwertyuioplkjhgfdsazxcvbnm");
                res.send(Response(200, "Đăng nhập thành công !!!", { "data": dataUser, "token": token }, true));
            } else {
                const result = await User.create({
                    "email": "",
                    "google_id": "",
                    "phone": phoneNumber,
                    "company_id": company_id,
                    "name": username,
                    "username": username,
                    "password": md5(password)
                });

                if(result)
                {
                    const token = jwt.sign({ _id: result._id }, "qwertyuioplkjhgfdsazxcvbnm");
                    res.send(Response(200, "Đăng nhập thành công !!!", { "data": result, "token": token }, true));
                }
                else 
                {
                    res.send(Response(202, "Đăng nhập thất bại !!!", [], false));
                }

             
            }
        } catch (err) {
            res.send(Response(202, "Đăng nhập thất bại !!!", [], false));
        }

    },

    LoginEndUserv2: async (req, res) => {
        try {
            const { password, username,phoneNumber, company_id, slug, historyId } = req.body;

            console.log("nghia",historyId);
            let role = 1;
            let filterLogin = {isDelete: false};

            if(company_id)
            {
                filterLogin["company_id"] = company_id;
            }
            if(filterLogin)
            {
                
            }
             filterLogin["phone"] = phoneNumber;
             var dataUser = await User.findOne()
            .or([
                filterLogin
            ]);
          
            


            
            if(dataUser == null  && role <2 )
            {
                  const resultUser = await User.create({
                            "email": "",
                            "type" : "0",
                            "google_id": "",
                            "company_id": company_id,
                            "phone": phoneNumber,
                            "name": username,
                            "username": username,
                            "password": md5(phoneNumber)
                    });
                    dataUser = resultUser;
            }
            
            
            


            const historyExit  = await HistorySkin.findOne({ 
                _id : ObjectId(historyId)
            });

            if(historyExit)
            {
                const beautyGame = await BeautyGame.findOne({
                    "companyId":  company_id
                });
                let scoreMax = 0;
                let score =0;

                if(beautyGame)
                {
                    scoreMax =  beautyGame.BeautyGame;
                    score = beautyGame.score;
                }
                else 
                {
                    score = 200;
                    scoreMax = 1000;
                }
                
                const enduser = await EndUserModel.findOne({
                    company_id: company_id,
                    phone: phoneNumber


                });

                let scoreInput = score;
                if(enduser)
                { 
                    if(enduser.score)
                    {   
                        scoreInput = enduser.score *1 + score*1;
                    }
                    else 
                    {

                    }
                    const objUpdate = {
                        "score": scoreInput
                        
                     };

                    //  let result1 = await EndUserModel.updateOne({ _id: ObjectId(enduser._id) }, objUpdate);

                }


                
                let objectUpdateHistory = {
                    "UserName":  username,
                    "Name": username,
                    // "score": score, 
                    "Phone": phoneNumber,
                    "Create_Date": Date.now()
                    };
                    
                    
                    let result = await HistorySkin.updateOne({ _id: ObjectId(historyId) }, objectUpdateHistory);
            }
            if (dataUser != null) {

               

                 const token = jwt.sign({ _id: dataUser._id }, "qwertyuioplkjhgfdsazxcvbnm");
                res.send(Response(200, "Đăng nhập thành công !!!", { "data": dataUser, "token": token, "role": role }, true));
            } else {
                res.send(Response(202, "Đăng nhập thất bại !!!", [], false));
            }
        } catch (err) {

           
            res.send(Response(202, JSON.stringify(err), err, false));
        }

    },


    resetPassword: async (req, res) => {
        try {
            const { old_password, new_password } = req.body;
            const dataUser = await User.findOne({ _id: req.user._id });

            if(dataUser.password == md5(old_password)) {
                if(md5(old_password) == md5(new_password)) {
                    const result = await User.updateOne({
                        _id: req.user._id
                    }, { password: md5(new_password) });
    
                    if (result) {
                        res.send(Response(200, "Cập nhật mật khẩu thành công !!!", [], true));
                    } else {
                        res.send(Response(202, "Cập nhật mật khẩu thất bại !!!", [], false));
                    }
                } else {
                    res.send(Response(202, "Mật khẩu cũ và mật khẩu mới không trùng khớp !!!", [], false));
                }
            } else {
                res.send(Response(202, "Mật khẩu cũ không trùng khớp !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },

    getUserByGoogleId: async (req, res) => {
        try {
            var dataUser = await User.find({ isDelete: false, google_id: req.body.google_id }).lean()
             
            res.send(Response(200, "Thành công", dataUser, true));

        } catch (err) {
            res.send(Response(202, "Dữ liệu đã tồn tại: " + JSON.stringify(err.keyValue), err, false));
        }
    },

    addUser: async (req, res) => {
        try {
            const { email, phone, company_id, username, password, name, google_id } = req.body;
            const result = await User.create({
                "email": email,
                "google_id": google_id,
                "phone": phone,
                "company_id": company_id,
                "name": name,
                "username": username,
                "password": md5(password)
            });
          
            if (result) {
                res.send(Response(200, "Tạo enduser thành công !!!", result, true));
            } else {
                res.send(Response(202, "Tạo enduser thất bại !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, "Có lỗi đã xảy ra !!!", err, false));
        }
    },

    updateUser: async (req, res) => {
        try {
           
             let body = req.body;
             const objUpdate = {
                    "email": body.email,
                    "introduction":body.introduction,
                    "addressHome":body.addressHome,
                    "name": body.fullName,
                    "company_id": body.company_id

            };
           
        
            let result = await User.updateOne({ _id: ObjectId(req.user._id) }, objUpdate);
            
           if (result) {
           
               let userUpdated = await User.findOne({ isDelete: false, _id: ObjectId(req.user._id)});
                res.send(Response(200, "Cập nhật thành công !!!", userUpdated, true));
            } else {
                res.send(Response(202, "Cập nhật thất bại !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },

    updateUser_APP: async (req, res) => {
        try {
            const { email, username, phone, name, address } = req.body;
            
            const objUpdate = {
                "email": email,
                "username": username,
                "phone": phone,
                "name": name,
                "address": address
            };

            let result = await User.updateOne({ _id: req.user._id }, objUpdate);

            if (result) {
                res.send(Response(200, "Cập nhật thành công !!!", [], true));
            } else {
                res.send(Response(202, "Cập nhật thất bại !!!", [], false));
            }
        } catch (err) {
            res.send(Response(202, JSON.stringify(err), err, false));
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

    }
}