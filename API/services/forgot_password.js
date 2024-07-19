const cron = require('cron');
const MailQueue = require('../models/MailQueue')
var sendMailForgot = require("../helpers/SendMailForgot");
var constants = require("../config/configDB");

const job = new cron.CronJob({
    cronTime: '*/15 * * * * *',
    onTick: async function () {
        var data = await MailQueue.find({
            "isSend": false,
            "type": "1"
        })

        for (let i = 0; i < data.length; i++) {
            if (data[i].isSend == false) {
                await sendMailForgot(data[i].email, data[i].email, constants.linkChangePass + data[i].code);

                console.log(data[i]._id)
                await MailQueue.updateOne({ _id: data[i]._id }, {
                    isSend: true
                })
            }
        }
    },
    start: true,
    timeZone: 'Asia/Ho_Chi_Minh'
});

job.start();