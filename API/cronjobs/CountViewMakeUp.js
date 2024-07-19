const cron = require('cron');
const ViewMiddelWare = require('../models/ViewMiddleWare')
const ViewMakeUp = require('../models/MakeUpCollection/ViewMakeUpModel')
const Company = require('../models/PluginCollection/CompanyPluginModel')
const lodash = require('lodash')

const job = new cron.CronJob({
    cronTime: '0 */3 * * *',
    onTick: async function () {

        var arrTempMakeUp = [];
        var slugMakeUp = [];
        var arrTemp = []

        while (await ViewMakeUp.countDocuments({ isChange: false }) > 0) {
            const resPlugin = await ViewMakeUp.find({ isChange: false }).limit(10);

            for (let i = 0; i < resPlugin.length; i++) {
                slugMakeUp.push(resPlugin[i].slug)
                arrTemp.push(resPlugin[i])

                await ViewMakeUp.updateMany({ slug: resPlugin[i].slug }, { isChange: true  })
            }
        }

        var arrPlugin = await Company.find({
            'Slug': { $in: slugMakeUp },
        })

        for (let i = 0; i < arrTemp.length; i++) {
            let virtualData = lodash.find(arrPlugin, { Slug: arrTemp[i].slug })
            arrTempMakeUp.push({
                slug: arrTemp[i].slug,
                virtual: virtualData.Res_skin,
                real: arrTemp[i].view,
                type: "1"
            })
        }


        arrTempMakeUp.sort((a, b) => parseFloat(a.real) - parseFloat(b.real) 
        || parseFloat(a.virtual) - parseFloat(b.virtual));

        await ViewMiddelWare.deleteMany({ type: 1 })
        await ViewMiddelWare.insertMany(arrTempMakeUp)
        await ViewMakeUp.updateMany({}, { $set: { isChange: false } })

    },
    start: true,
    timeZone: 'Asia/Ho_Chi_Minh'
});

job.start();