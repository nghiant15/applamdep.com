// const cron = require('cron');
// const ViewMiddelWare = require('../models/ViewMiddleWare')
// const ViewPlugin = require('../models/PluginCollection/ViewPluginModel')
// const Company = require('../models/PluginCollection/CompanyPluginModel')
// const lodash = require('lodash')

// const job = new cron.CronJob({
//     cronTime: '0 */3 * * *',
//     onTick: async function () {

//         var arrTempPlugin = [];
//         var slugPlugin = [];
//         var arrTemp = []

//         while (await ViewPlugin.countDocuments({ isChange: false }) > 0) {
//             const resPlugin = await ViewPlugin.find({ isChange: false }).limit(10);

//             for (let i = 0; i < resPlugin.length; i++) {
//                 slugPlugin.push(resPlugin[i].slug)
//                 arrTemp.push(resPlugin[i])

//                 await ViewPlugin.updateMany({ slug: resPlugin[i].slug }, { isChange: true  })
//             }
//         }

//         var arrPlugin = await Company.find({
//             'Slug': { $in: slugPlugin },
//         })

//         for (let i = 0; i < arrTemp.length; i++) {
//             let virtualData = lodash.find(arrPlugin, { Slug: arrTemp[i].slug })
//             arrTempPlugin.push({
//                 slug: arrTemp[i].slug,
//                 virtual: virtualData.Res_skin,
//                 real: arrTemp[i].view,
//                 type: "0"
//             })
//         }

//         arrTempPlugin.sort((a, b) => parseFloat(a.real) - parseFloat(b.real) 
//         || parseFloat(a.virtual) - parseFloat(b.virtual));


//         await ViewMiddelWare.deleteMany({ type: 0 })
//         await ViewMiddelWare.insertMany(arrTempPlugin)
//         await ViewPlugin.updateMany({}, { $set: { isChange: false } })
        
        
//     },
//     start: true,
//     timeZone: 'Asia/Ho_Chi_Minh'
// });

// job.start();