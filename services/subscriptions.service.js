const subscriptionsModel = require('../models/subscriptions.model');

async function getAll() {
    return await subscriptionsModel.find();
}

async function getCount(){
    return await subscriptionsModel.countDocuments();
}

async function getById(idVar) {
    try {
        return  await subscriptionsModel.findOne({ _id: idVar });
    }
    catch (e) {
          return null;
    }
}

async function add(model) {
    let subscription = new subscriptionsModel(model);
    return await subscription.save();
}

async function edit(id, model) {
    return await subscriptionsModel.findOneAndUpdate({ _id: id }, {
        name : model.name,
        status : model.status
    });
}

async function remove(id) {
    return await subscriptionsModel.findOneAndRemove({ _id: id });
}

module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.add = add;
module.exports.edit = edit;
module.exports.remove = remove;
module.exports.getCount = getCount;
