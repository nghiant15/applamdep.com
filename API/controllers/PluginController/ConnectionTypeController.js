const ObjectId = require('mongodb').ObjectId
const HistorySkin = require('../../models/PluginCollection/HistorySkinModel')
const CompanyPlugin = require('../../models/PluginCollection/CompanyPluginModel')
const UserPluginModel = require('../../models/PluginCollection/UserPluginModel')
const ViewPlugin = require('../../models/PluginCollection/ViewPluginModel')
const Response = require('../../helpers/Response');
const Customer = require('../../models/PluginCollection/CustomerModel');

const BeautyGame = require('../../models/PluginCollection/BeautyGame');
const EndUserModel = require('../../models/EndUserModel');
module.exports = {
   
 addContionType2:  async (req, res) => {
    try {
     let body = req.body;
     
     const {historyId, connectionType} = req.body;
     const result = await HistorySkin.findOne({
         "_id": ObjectId(historyId)
     });
     if (result) {

        const objUpdate = {
            "connectionType": connectionType,
            "timeConnection":  Date.now()
            
         };
         let result1 = await HistorySkin.updateOne({ _id: ObjectId(historyId) }, objUpdate);
         res.send(Response(200, "Fail", [], true));
     } else {
         res.send(Response(200, "Fail", [], false));
     }
 } catch (err) {
    res.send(Response(202, "Fail", [], false));
 }
},
    
}