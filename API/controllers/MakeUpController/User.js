const ObjectId = require('mongodb').ObjectId;
const User = require('../../models/MakeUpCollection/user');

module.exports={
    addUser: async (req, res)=>{
        try{
            const {email, name, type, avatar, device} = req.body;
            if(email == null || email == ''
            || type == null || type == ''){
                res.json({
                    status: 201,
                    message: "Miss params",
                    data: null
                });
                return;
            }

            const u = await User.findOne({email: email});

            if(u){
                res.json({
                    status: 201,
                    message: "User already exists",
                    data: null
                });
            }else{
                const date = new Date()
                const user = new User({
                    email: email,
                    name: name,
                    type: type,
                    avatar: avatar || "",
                    isActive: true,
                    dateUpdate: date.getTime(),
                    device: device || {}
                });

                await user.save();
            }

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        }catch(err){
            res.json({
                status: 201,
                message: err.message,
                data: null
            });
        }
    },
    getInfo: async (req, res)=>{
        try{
            const {email} = req.body;

            const u = await User.findOne({email: email});

            if(u){
                res.json({
                    status: 200,
                    message: "Success",
                    data: u
                });
            }else{
                res.json({
                    status: 201,
                    message: "No user",
                    data: null
                });
            }
        }catch(err){
            res.json({
                status: 201,
                message: err.message,
                data: null
            });
        }
    },
    getUser: async (req, res)=>{
        try{
            const u = await User.find().sort({dateUpdate: -1});
            res.json({
                status: 200,
                message: "Success",
                data: u
            });
        }catch(err){
            res.json({
                status: 201,
                message: err.message,
                data: null
            });
        }
    },
    registerDevice: async(req, res)=>{
        const {email, device} = req.body;
        if(email == null || email == ''
        || device == null || device == ''){
            res.json({
                status: 201,
                message: "Miss params",
                data: null
            });
            return;
        }
        try{
            const update = {
                device: device
            }

            await User.updateOne({email: email}, update)
            res.json({
                status: 200,
                message: "success",
                data: null
            });
        }catch(err){
            res.json({
                status: 201,
                message: err.message,
                data: null
            });
        }
    },
    updateUser: async (req, res)=>{
        try{
            const {id, email, age, name, avatar, gender, type} = req.body;

            if(email == null || email == ''
            || id == null || id == ''
            || type == null || type == ''
            // || age == null || age == ''
            || name == null || name == ''
            // || gender == null || gender == ''
            ){
                res.json({
                    status: 201,
                    message: "Miss params",
                    data: null
                });
                return;
            }

            const date = new Date()
            const update = {
                email: email,
                age: age,
                name: name,
                gender: gender,
                type: type,
                avatar: avatar || "",
                dateUpdate: date.getTime()
            }

            await User.updateOne({_id: ObjectId(id)}, update)

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        }catch(err){
            res.json({
                status: 201,
                message: err.message,
                data: null
            });
        }
    },
    deleteUser:  async (req, res)=>{
        try{
            const {id} = req.body
            if(id == null || id.trim() == ''){
                res.json({
                    status: 201,
                    message: "Miss params",
                    data: null
                });
                return;
            }

            await User.deleteOne({_id: ObjectId(id)})

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        }catch(err){
            res.json({
                status: 201,
                message: err.message,
                data: null
            });
        }
    }
}