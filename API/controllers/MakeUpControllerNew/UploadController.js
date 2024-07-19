var request = require('request');
const { ObjectID } = require('mongodb');
const Color = require('../../models/MakeUpCollection/color')
const Upload = require('../../models/MakeUpCollection/upload');

module.exports={
    upload: async (req, res)=>{
        const {email, image, image_type, makeupID} = req.body;

        if(email == null || email == "" 
            || image == null || image == ""
            || image_type == null || image_type == ""
            || makeupID == null || makeupID == ""){
            res.json({
                status: 201,
                message: "Miss params"
            });
            return;
        }
        
        try{
            const color = await Color.findOne({makeup_id: makeupID});
            const body = { 
                "parameter": { 
                    "makeup_id": makeupID, 
                    "makeup_alpha": color.alpha || 50, 
                    "beauty_alpha": 0,
                    "rsp_media_type": "base64" 
                }, 
                "extra": {}, 
                "media_info_list": [
                    { 
                        "media_data": image, 
                        "media_profiles": { 
                            "media_data_type": image_type//"base64"
                        } 
                    }
                ] 
            };
            
            
            const URL = 'https://openapi.mtlab.meitu.com/v4/makeup?api_key='
                +process.env.APPKEY+'&api_secret='+process.env.SECRET_ID;
            
//             const URL = 'https://openapi.mtlab.meitu.com/v3/makeup?api_key='
//                 +process.env.APPKEY+'&api_secret='+process.env.SECRET_ID;
                

            const config = {
                method: 'POST',
                url: URL,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            };

            const response = await new Promise((resolve, reject)=>{
                request(config, function (error, response) { 
                    if (error) reject(error);
                    const json = JSON.parse(response.body);

                    if(response.statusCode != 200){
                        reject(json);
                    }else{
                        resolve(json);
                    }
                  });
            })

            const date = new Date();

            const upload = new Upload({
                email: email,
                image: response.media_info_list[0].media_data,
                image_type: image_type,
                created_at: date.getTime()
            });

            // const upload_ = await upload.save();
            // await upload_.save();

            email != 'test@gmail.com' && upload.save();
            res.json({
                status: 200,
                message: "Success",
                data: response
            });
        }catch(err){
            console.log(err.message)
            res.json({
                status: 201,
                message: err.ErrorMsg == null ? err : err.ErrorMsg,
                data: null
            });
        }
    },
    getListImage: async (req, res)=>{
        const {email} = req.query;
        try{
            let e = email;
            if(!email.includes('@')){
                e = `+${email.trim()}`;
            }
            const cursor = await Upload.find({email: e}).sort({created_at: -1});
            res.json({
                status: 200,
                message: "Success",
                data: cursor
            });
        }catch(err){
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    },
    removeImage: async (req, res)=>{
        try{
            const {email, id} = req.body;

            if(email == null || email == "" 
            || id == null || id == ""){
                res.json({
                    status: 201,
                    message: "Miss params"
                });
            }

            await Upload.deleteOne({
                _id: ObjectID(id),
                email: email
            });

            res.json({
                status: 200,
                message: "Success",
                data: null
            });
        }catch(err){
            res.json({
                status: 201,
                message: err,
                data: null
            });
        }
    }
}
