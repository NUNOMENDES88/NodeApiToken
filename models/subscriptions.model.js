var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let subscriptionsSchema = new Schema({
    name: {type: String, required: 'Name off the subscription'},
    status: {
        type: String,
        enum : ['pendent','confirmed','cancel'],
        default: 'pendent'
    },
    createDate: {type: Date, default: Date.now}
});

let subscriptionsModel = mongoose.model('subscriptions', subscriptionsSchema);
module.exports = subscriptionsModel;