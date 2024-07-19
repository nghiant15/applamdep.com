const mongoose = require('mongoose');

const ViewMakeUp = new mongoose.Schema({
    company_id: {
        type: String
    },
    phone: {
        type: String
    },
    slug: {
        type: String
    },
    view: {
        type: String
    },
    create_date: {
        type: Date,
        default: Date.now()
    },
    isChange: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('ViewMakeUp', ViewMakeUp, 'ViewMakeUp');