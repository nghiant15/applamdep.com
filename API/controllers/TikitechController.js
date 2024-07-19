
const ObjectId = require('mongodb')
const axios = require('axios');
const Response = require('../helpers/Response')
const sharp = require('sharp');

module.exports = {

    skinAI: async (req, res) => {
      const {image_base64 } = req.body;
      let image64Input =image_base64; 

  
      const data = {
        image_base64: image64Input
      };
      
      const options = { M
        headers: {
            'Content-Type': 'application/json',
            'apikey': 'dGlraXRlY2h0cmlhbGtleQ==',
        }
      };
      // const url = 'https://csgadmin.com/api/userskin/pensillia';
      const  url ='https://csgadmin.com/api/userskin'; 

      const responsedata = await  axios.post(url, data, options)
        .then(function (response) {
            let data =  (JSON.stringify(response.data));
        
            return response.data; 
          })
        .catch(function (error) {
            console.log(error);
        });
        res.send(Response(200, "Soi da thành công", responsedata, true));
           
    }

}