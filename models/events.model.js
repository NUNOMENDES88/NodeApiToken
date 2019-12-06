var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const subscriptionsSchema = require('./subscriptions.model').schema;

let eventsSchema = new Schema({
    designation: {type: String, required: 'Designation of event'},
    location: {
        type: {type: String},
        coordinates: [ Number]
    },
    category: {type: String, required: 'Category of event'},
    lotation: {type: Number},
    date: {type: Date, default: Date.now},
    createDate: {type: Date, default: Date.now},
    subscriptions: [ subscriptionsSchema ]
});

let eventsModel = mongoose.model('events', eventsSchema);
module.exports = eventsModel;