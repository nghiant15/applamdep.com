const ObjectId = require('mongodb').ObjectId
const Campaign = require('../models/PluginCollection/GameModel')
const History = require('../models/PluginCollection/HistorySkinModel')
const Response = require('../helpers/Response');
module.exports = {
    getAll: async (req, res) => {
        const { } = req.query;
         try {

                
                var result = null;
                var filterSearch  = {
                    "objDelete": false
                 };
                var columnDisplay =  'gameTitle min des typeGame status max from to slugApply';
        
              result = await Campaign.find(
                         filterSearch ,
                        columnDisplay
              )     
              .sort({ 'index' : -1});
              if (result) {
                let totalRecord = await Campaign.countDocuments(filterSearch);

 
                res.send(Response(200, "Lấy danh sách thành công", result, true, totalRecord));
            } else {
                res.send(Response(202, "Lấy danh sách liên hệ thất bại", result, true,0));
            }

        } catch (err) {
            res.send(Response(202, JSON.stringify(err), err, false));
        }
    },
    getGame: async (req, res) => {
        const { companyId } = req.body;
          try {
            var result = null;
            var filterSearch  = {"companyId": companyId, statusGame: true};
            console.log(filterSearch);
            result = await Campaign.findOne(
                        filterSearch
            );

            console.log(result);
            if (result) {
         
                 res.send(Response(200, "Lấy danh sách thành công", result, true, 0));
            } else {
                    res.send(Response(200, "thao tác thất bại", result, false,0));
            }

        } catch (err) {
                     res.send(Response(202, JSON.stringify(err), err, false));
        }
    },
    getData1: async (req, res) => {
        const { companyId } = req.body;
          try {
            var result = null;
            var filterSearch  = {"companyId": companyId, gameJoinType1: true, "successGame": false};
            var columnDisplay =  'ageGame ageGameReal Image successGame ipClient regionName UserName Phone Create_Date';
            result = await History.find(
                        filterSearch,
                        columnDisplay
            );
             if (result) {
         
                 res.send(Response(200, "Lấy danh sách thành công", result, true, 0));
            } else {
                    res.send(Response(200, "thao tác thất bại", result, false,0));
            }

        } catch (err) {
                     res.send(Response(202, JSON.stringify(err), err, false));
        }
    },
    getData11: async (req, res) => {
        const { companyId } = req.body;
          try {
            var result = null;
            var filterSearch  = {"companyId": companyId, gameJoinType1: true, "successGame": true};
            var columnDisplay =  'ageGame ageGameReal Image successGame ipClient regionName UserName Phone Create_Date';
            result = await History.find(
                        filterSearch,
                        columnDisplay
            );
             if (result) {
         
                 res.send(Response(200, "Lấy danh sách thành công", result, true, 0));
            } else {
                    res.send(Response(200, "thao tác thất bại", result, false,0));
            }

        } catch (err) {
                     res.send(Response(202, JSON.stringify(err), err, false));
        }
    },

    getInfo: async (req, res) => {
        const { company_id, gameType } = req.query;
        try {
            var result = null;
            var filterSearch  = {"companyId": company_id, typeGame: gameType };
            result = await Campaign.findOne(
                        filterSearch 
            );
            if(result==null)
            {
                result = {
                        poupintro: "",
                        pupupSuccess: "",
                        popupfail: "",
                        fromDate: null,
                        todate: null,
                        fromtime: "",
                        totime: '',
                        skinNumber: 0,
                        statusGame: false
                };
            }
            res.send(Response(200, "Lấy danh sách thành công", result, true, 0));

        } catch (err) {
             res.send(Response(202, JSON.stringify(err), err, false));
        }
    },
    updateGame: async (req, res) => {
    try {
         const { 
                    poupintro,
                    pupupSuccess,
                    popupfail,
                    fromDate,
                    todate,
                    fromtime,
                    totime,
                    company_id,
                    typeGame, 
                    skinNumber,
                    imageBannerDesktop,
                    hrefImageBannerMobile,
                    hrefImageBannerDesktop,
                    imageBannerMobile,
                    statusGame
        } = req.body;


        var objUpdate = {
            poupintro: poupintro,
            pupupSuccess: pupupSuccess,
            popupfail: popupfail,
            fromDate: fromDate, 
            todate: todate, 
            fromtime: fromtime,
            totime: totime, 
            skinNumber: skinNumber,
            statusGame: statusGame,
            companyId: company_id,
            imageBannerDesktop: imageBannerDesktop,
            imageBannerMobile: imageBannerMobile,
            hrefImageBannerMobile: hrefImageBannerMobile,
            hrefImageBannerDesktop: hrefImageBannerDesktop,
            typeGame: typeGame
        };
        var filterd  = {"companyId": company_id, typeGame: typeGame};
        var resultGame = await Campaign.findOne(filterd);
        if(resultGame)
            await Campaign.updateOne({ _id: ObjectId(resultGame._id) }, objUpdate);
        else
            await Campaign.create(objUpdate);
        res.send(Response(200, "Thao tác thành công", [], true));

    } catch (err) {

         res.send(Response(202, "Thao tác thất bại: " + JSON.stringify(err.keyValue), err, false));
    }
    }
}